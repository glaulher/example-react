import React, { useState, useEffect } from 'react'
import data from './data/mock-data.json'
import './style.scss'

const ROW_HEIGHT = 40 // Define a altura de cada linha da tabela

export default function App() {
  const [tableData, setTableData] = useState(data.slice(0, 20)) // Inicialmente, renderize as primeiras 20 linhas
  const [isLoading, setIsLoading] = useState(false)

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    // Se o usuário estiver a menos de 200 pixels do fim da página, carregue mais dados
    if (scrollTop + clientHeight >= scrollHeight - 200 && !isLoading) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isLoading) {
      return
    }

    // Simula um atraso no carregamento dos dados para que possa exibir a mensagem carregando.
    setTimeout(() => {
      const currentSize = tableData.length
      const newData = data.slice(currentSize, currentSize + 20)
      setTableData([...tableData, ...newData])
      setIsLoading(false)
    }, 1000)
  }, [isLoading, tableData])

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>FIRST NAME</th>
          <th>LAST NAME</th>
          <th>EMAIL</th>
          <th>PHONE</th>
        </tr>
      </thead>
      <tbody style={{ height: `${tableData.length * ROW_HEIGHT}px` }}>
        {tableData.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          )
        })}
        {isLoading && (
          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}>
              Carregando...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
