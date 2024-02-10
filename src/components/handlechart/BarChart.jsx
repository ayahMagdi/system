import React, { useEffect, useMemo, useState } from 'react'
import { Bar, Line, Pie, PolarArea } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { Data } from './Data';
import { useStateValue } from '../../context/stateProvider';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
  

const BarChart = ({chartData}) => {

  const {outwardBills} = useStateValue()

  const [dataCurrentWeek , setDataCurrentWeek] = useState([])
  const [dataLastWeek , setDataLastWeek] = useState([])
  const [currentWeek , setCurrentWeek] = useState([])
  const [lastWeek , setLastWeek] = useState([])

   const endDate = new Date()
   const date = new Date()
   date.setDate(date.getDate() - 6);
   const startDate = (date.getMonth()+1) +'/'+ date.getDate() +'/'+date.getFullYear();
   const endLastWeek = new Date()
   endLastWeek.setDate(endLastWeek.getDate() - 12);

    function getDates(startDate, endDate) {
      const dateArray = [];
      let currentDate = moment(startDate, 'M/DD/YYYY').startOf('day');
      const formattedEndDate = moment(endDate, 'M/DD/YYYY').startOf('day');

      while (currentDate <= formattedEndDate) {
        dateArray.push(new Date(currentDate).toLocaleDateString());
        currentDate = moment(currentDate).add(1, 'days');
      }
    
      return dateArray;
    }
  
    const datesBetweenCurrentWeek = getDates(startDate, endDate.toLocaleDateString());
    const datesBetweenLastWeek = getDates(endLastWeek.toLocaleDateString() , startDate);

    function getDayName(locale = "ar-u-ca-islamic-nu-latn") {
      return datesBetweenCurrentWeek.map(date => new Date(date).toLocaleDateString(locale, {weekday: 'long'}))
    }

    const labels = getDayName();
   
    // get data week funciton
    const UniqueDataInvoice = (data) => {
      const getDataUnique = useMemo(() => {
        const unique = [];
    
        data.forEach(item => {
        let exists = false;
        
        unique.forEach(u => {
          if(isEqual(u.invoice, item.invoice)) {
            exists = true;
          }
        });
    
        if(!exists) {
          unique.push(item);
        }
      });
    
      return unique;
      }, [data]);
      return getDataUnique
    }

    const getWeeksObj = (data) => {
      const result = Object.values(data.reduce((acc, cur) => {
        const date = new Date(cur.date).toLocaleDateString();
        if (acc[date]) {
          acc[date].total += cur.totalwd;
        } else {
          acc[date] = { date, total: cur.totalwd };
        }
        return acc;
       }, {}));

      return result
    }

    function compareDatesWithTotals(datesArray, dataWithTotals) {
      const result = [];
      
      // Convert dataWithTotals array into an object for efficient lookup
      const dataObj = dataWithTotals.reduce((obj, item) => {
        obj[item.date] = item.total;
        return obj;
      }, {});

      // console.log(dataObj)
    
      // Iterate over the datesArray and check if each date exists in dataObj
      datesArray.forEach(date => {
        if (dataObj[date]) {
          // If the date exists, push it to the result array with its total value
          result.push({ date, total: dataObj[date] });
        } else {
          // If the date doesn't exist, push it with a total value of 0
          result.push({ date, total: 0 });
        }
      });
    
      return result;
    }

    const currentWeekSales = compareDatesWithTotals(datesBetweenCurrentWeek , getWeeksObj(UniqueDataInvoice(dataCurrentWeek)))
    const lastWeekSales = compareDatesWithTotals(datesBetweenLastWeek , getWeeksObj(UniqueDataInvoice(dataLastWeek)))

    const data = {
      labels,
      datasets: [
          {
          label: 'الاسبوع الحالي',
          data: currentWeekSales?.map((data) => data.total),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
          label: 'الاسبوع الماضي',
          data: lastWeekSales?.map((data) => data.total),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
      ],
    };

    
    useEffect(() => {
      
     const getDataWeeks = (data) => {
        const getDataWeek = outwardBills?.filter(inward => {
          const filtered = data?.filter(date => new Date(inward.date).toLocaleDateString() === new Date(date).toLocaleDateString());
          if (filtered && filtered.length > 0) {
            return true;
          }
          return false;
        });
        return getDataWeek
      }
      
      setDataCurrentWeek(getDataWeeks(datesBetweenCurrentWeek))
      setDataLastWeek(getDataWeeks(datesBetweenLastWeek))

    },[outwardBills])

    return (
        <div className="chart-container h-[290px] w-full my-5 flex justify-between gap-10">
          <div className='w-2/4 h-[290px]'>
              <Bar  
                data={data}
                options = {{
                  scales: {
                    y: {
                      position: 'right',
                    },
                
                    x: {
                      reverse: true
                    }
                  },
                  plugins: {
                    title: {
                        display: true,
                        // text: "Users Gained between 2016-2020"
                    },
                    legend: {
                        position: "bottom", // تحديد موضع التسميات بجوار بعضها البعض
                        labels: {
                        // usePointStyle: true,
                        padding: 15,
                        // pointStyle: "circle",
                        font: {
                            size: 14,
                        }
                        }
                    }
                    }
                }}
              />
          </div>
          <div className='w-2/4 h-full'>
              <Bar  
                data={data}
                options = {{
                  scales: {
                    y: {
                      position: 'right',
                    },
                
                    x: {
                      reverse: true
                    }
                  },
                  plugins: {
                    title: {
                        display: true,
                        // text: "Users Gained between 2016-2020"
                    },
                    legend: {
                        position: "bottom", // تحديد موضع التسميات بجوار بعضها البعض
                        labels: {
                        // usePointStyle: true,
                        padding: 15,
                        // pointStyle: "circle",
                        font: {
                            size: 14,
                        }
                        }
                    }
                    }
                }}
              />
          </div>
        </div>
      );
    }

export default BarChart