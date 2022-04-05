
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

type workOrderData = {
  work_order_id: number,
  description: string,
  received_date: string,
  assigned_to: {person_name: string, status: "Assigned" | "In progress" | "Confirmed"}[],
  status: "Confirmed" | "New" | "Completed" | "Canceled",
  priority: "Low" | "Normal" | "Heigh"
}

export const Table = () => {
  const [workOrdersList, setWorkOrderList] = useState<workOrderData[]>([] as workOrderData[])
  const [workOrdersListToShow, setWorkListToShow] = useState<workOrderData[]>([] as workOrderData[])
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    fetch('work-orders.json')
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((res) => {
        setWorkOrderList(res.response.data as workOrderData[]);
        setWorkListToShow(res.response.data as workOrderData[]);
      })
  }, [])

  const onSearch = (query: string | null) => {
    if(query === null) {
      setWorkListToShow(workOrdersList);
      return;
    }
    setWorkListToShow(workOrdersList.filter(({description}) => (
      description.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )))
  }

  useEffect(() => {
    onSearch(searchParams.get('query'))
  }, [searchParams])

  return (
    <table className="table">
      <tr className="table__tr">
        <th className="table__th">
          WO ID
        </th>
        <th className="table__th">
          Description
        </th>
        <th className="table__th">
          Received date
        </th>
        <th className="table__th">
          Assigned to
        </th>
        <th className="table__th">
          Status
        </th>
        <th className="table__th">
          Priority
        </th>
      </tr>
      {
        workOrdersListToShow.map(({work_order_id, description, received_date, assigned_to, status, priority}) => (
          <tr className="table__tr">
            <td className="table__td">{work_order_id}</td>
            <td className="table__td">{description}</td>
            <td className="table__td">{received_date}</td>
            <td className="table__td">
              {
                assigned_to.map((assignToData) => (
                  <div className="table__td-data">
                    {assignToData.person_name} {assignToData.status}
                  </div>
                ))
              }
            </td>
            <td className="table__td">{status}</td>
            <td className="table__td">{priority}</td>
          </tr>
        ))
      }
    </table>
  )
}