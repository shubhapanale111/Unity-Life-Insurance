import AgentSideBar from './agentSidebar'
import AgentNavBar from './agentNavbar'
import './Dashboard.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
const AgentPolicyViewDetailsApply = () => {
  let location = useLocation()

  let agent = location.state.agent
  let customer = location.state.customer
  let policy=location.state.policy
 
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  return (
    <div className="dashboard d-flex">
      <div>
        <AgentSideBar agent={agent} />
      </div>
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexFlow: 'column',
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <AgentNavBar agent={agent} />
        <h1>Details:</h1>

        <center>
          <h1>
            {policy.policyName} 
          </h1>
          <br />

          <table
            className="table"
            style={{ width: '60%', border: '2px', borderBlockStyle: 'solid' }}
          >
            <tbody style={styles.myfont}>
              <tr>
                <td>Age Limit</td>
                <td>{policy.minEntryAge}-{policy.maxEntryAge} Years</td>
              </tr>
              <tr>
                <td>Tenure</td>
                <td>{policy.minPeriodMonths}-{policy.maxPeriodMonths} Months</td>
              </tr>
              <tr>
                <td>Premium</td>
                <td>{policy.minMonthPremium}-{policy.maxMonthPremium} INR/Month</td>
              </tr>
              <tr>
                <td>Interest Rate p.a</td>
                <td>{policy.perAnnumRate} p.c.p.a</td>
              </tr>
              <tr>
                <td>Agent Commission Rate </td>
                <td>{policy.agentCommisionPercentage} %</td>
              </tr>
            </tbody>
          </table>
        </center>
        <center>
          <Link
            to="/agentApplyForCustomerPolicy"
            className="btn btn-success"
            state={{agent:agent,customer:customer,policy:policy}}
            style={{
              backgroundColor: '#FFCB08',
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
           Apply
          </Link>
        </center>
      </div>
    </div>
  )
}
export default AgentPolicyViewDetailsApply
const styles = {
  myfont: {
    textDecoration: 'none',
    fontWeight: 'bold',
    textAlign: 'left',
  },
}
