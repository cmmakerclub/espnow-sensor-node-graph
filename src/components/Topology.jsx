const React = require('react')

const Topology = () => {
  return (
    <div className='container'>
      <div className='section'>
        <div className='card'>
          <div className='card-header'>
            <p className='card-header-title'>Topology</p>
          </div>
          <div className='card-content'>
            <div id='mynetwork' style={{height: 600}}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topology

