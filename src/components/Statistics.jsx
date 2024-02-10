import { faBoxesStacked, faChartColumn, faChartLine, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React, { useEffect, useRef } from 'react'
import BestSellers from './BestSellers'
import Statistic from './Statistic';
// import { Chart } from 'chart.js/auto';
import 'chartjs-plugin-annotation';
// import { Pie, PolarArea } from 'react-chartjs-2';
import { Data } from './handlechart/Data';
import { useStateValue } from '../context/stateProvider';
import { useEffect, useState } from 'react';

const Statistics = () => {

    const { stores , clientBalance , items ,suppliers,clients } = useStateValue();
    const [mostWantedItems, setMostWantedItems] = useState([]);
    const [clientsList, setClientsList] = useState([]);
    const [progressBarsItems, setProgressBarsItems] = useState([]);
    const [progressBarsClients, setProgressBarsClients] = useState([]);

    const tableColors = [
      {
        progressBg: '#5047cf40',
        progress: '#606ae4eb',
        percentageBg: '#1846cd17',
      },
      {
        progressBg: '#f299ec87',
        progress: '#cd18c0eb',
        percentageBg: '#cd18c017',
      },
      {
        progressBg: '#e99a4b4a',
        progress: '#e99a4beb',
        percentageBg: '#e2862a3b'
      },
      {
        progressBg: '#9fc8ef4f',
        progress: '#a2d2ff',
        percentageBg: '#a2d2ff38',
      },
      {
        progressBg: '#ffafcc4f',
        progress: '#ffafcc',
        percentageBg: '#ffafcc5c'
      },
    ]

    function compareByQuantity_out(a, b) {
      return  b.soldqty - a.soldqty;
    }

    function compareByTotal(a, b) {
      return  b.total - a.total;
    }

    let sortedItems = stores.sort(compareByQuantity_out)
    let sortedClients = clientBalance.sort(compareByTotal)
  
    useEffect(() => {
      setMostWantedItems([{...sortedItems[0]} , {...sortedItems[1]} , {...sortedItems[2]} , {...sortedItems[3]}])
      setClientsList([{...sortedClients[0]} , {...sortedClients[1]} , {...sortedClients[2]} , {...sortedClients[3]}])
  
      const productSales = [sortedItems[0]?.soldqty, sortedItems[1]?.soldqty, sortedItems[2]?.soldqty , sortedItems[3]?.soldqty];
      const totalSales = productSales?.reduce((acc, current) => parseInt(acc) + parseInt(current), 0);
      const cleintOrders = [sortedClients[0]?.total, sortedClients[1]?.total, sortedClients[2]?.total ,  sortedClients[3]?.total ];
      const totalOrders = cleintOrders?.reduce((acc, current) => parseInt(acc) + parseInt(current), 0);
  
      const productPercentages = productSales.map((sales) => (sales / totalSales) * 100);
      const ClientPercentages = cleintOrders.map((sales) => (sales / totalOrders) * 100);
  
      const progressBarData = [
        { id: 1, mainValue: productPercentages[0] || 0, progress: 0 },
        { id: 2, mainValue: productPercentages[1] || 0, progress: 0 },
        { id: 3, mainValue: productPercentages[2] || 0, progress: 0 },
        { id: 4, mainValue: productPercentages[3] || 0, progress: 0 },
      ];
      const progressBarDataOrders = [
        { id: 1, mainValue: ClientPercentages[0] || 0, progress: 0 },
        { id: 2, mainValue: ClientPercentages[1] || 0, progress: 0 },
        { id: 3, mainValue: ClientPercentages[2] || 0, progress: 0 },
        { id: 4, mainValue: ClientPercentages[3] || 0, progress: 0 },
      ];
      
      setProgressBarsItems(progressBarData);
      setProgressBarsClients(progressBarDataOrders);
      
      const interval = setInterval(() => {
        setProgressBarsItems((prevProgressBars) =>
          prevProgressBars.map((bar) => {
            const step = bar.mainValue / 100;
            const newProgress = bar.progress + step;
      
            if (newProgress >= bar.mainValue) {
              clearInterval(interval);
              return { ...bar, progress: bar.mainValue };
            }
            return { ...bar, progress: newProgress };
          })
        );
        setProgressBarsClients((prevProgressBars) =>
          prevProgressBars.map((bar) => {
            const step = bar.mainValue / 100;
            const newProgress = bar.progress + step;
      
            if (newProgress >= bar.mainValue) {
              clearInterval(interval);
              return { ...bar, progress: bar.mainValue };
            }
            return { ...bar, progress: newProgress };
          })
        );
      }, 10);
  
      return () => clearInterval(interval);
    }, [stores , clientBalance]);

  return (
    <div>
        <div className='mb-5'>
            <div className='mt-2 grid grid-cols-5 gap-4'>
                <Statistic 
                        icon={faBoxesStacked}
                        endCount={items?.length || 100}
                        title='عدد الاصناف'
                        bg='bg-[#619bff] shadow-[0_0_35px_0px_rgba(97,155,255,.2)]'
                        altBg='bg-[#9ffea8]'
                        url='/homepage/allproducts'
                        branch='itemsList'
                />
                 <Statistic 
                        icon={faUserPlus}
                        endCount={suppliers?.length || 18}
                        title='عدد الموردين'
                        bg='bg-[#4c4bac] shadow-[0_0_35px_0px_rgba(76,75,172,.2)]'
                        altBg='bg-[#619bff]'
                        url='/homepage/allsuppliers'
                        branch='suppliersList'
                />
                 <Statistic 
                        icon={faUserGroup}
                        endCount={clients?.length || 30}
                        title='عدد العملاء'
                        bg='bg-[#ff7f8b] shadow-[0_0_35px_0px_rgba(255,127,139,.2)]'
                        altBg='bg-[#cfbaf0]'
                        url='/homepage/allclients'
                        branch='clinetsList'
                />
                 <Statistic 
                        icon={faChartLine}
                        endCount={sortedItems[0]?.soldqty || 400}
                        prod={sortedItems[0]?.name}
                        title='اكثر المنتجات مبيعا'
                        //  #fae0e1
                        bg='bg-[#f8ddde] shadow-[0_0_35px_0px_rgba(229,127,131,.2)]'
                        altBg='bg-[#ffcbcf]'
                        url='/homepage/allproducts'
                        branch='itemsList'
                />
                 <Statistic 
                        icon={faChartColumn}
                        endCount={sortedItems?.length.soldqty || 50}
                        prod={sortedItems[sortedItems?.length - 1]?.name}
                        title='اقل المنتجات مبيعا'
                        // #a4ebf9
                        bg='bg-[#89e0f2] shadow-[0_0_35px_0px_rgba(65,213,244,.2)]'
                        altBg='bg-[#48cae4]'
                        url='/homepage/allproducts'
                        branch='itemsList'
                />
            </div>
        </div>
        <div className='flex justify-between items-center gap-5'>
            <BestSellers title='المنتجات الاكثر طلبا' rowName='المنتج' mostWantedItems={mostWantedItems} tableColors={tableColors} progressBars={progressBarsItems} />
            <BestSellers title='العملاء المميزين' rowName='العميل' mostWantedItems={clientsList} tableColors={tableColors} progressBars={progressBarsClients} />
        </div>
    </div>
  )
}

export default Statistics