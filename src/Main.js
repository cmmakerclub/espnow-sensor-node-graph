const React = require('react')
const ReactDOM = require('react-dom')

import 'bulma/css/bulma.css'
import _ from 'lodash'
import Topology from './components/Topology.jsx'

let vis = require('vis')
window.objMaster = {}
require('./mqtt/config')

const nodesId = {}
const edgesId = {}
const multipleMaster = {}

class Container extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {

    let nodes = new vis.DataSet([])
    let edges = new vis.DataSet([])

    function fn () {
      Object.keys(objMaster).forEach((key, idx) => {
        // console.log(`${key}`)

        if (nodesId[key] === undefined) {
          nodes.add({
            id: key, label: key
          })

          nodesId[key] = 1
        }
        objMaster[key].children_array.forEach((v, idx) => {
            if (nodesId[v.info.from] === undefined) {

              nodes.add({
                id: v.info.from, label: `--${v.info.from}`
              })

              nodesId[v.info.from] = 1
            }
            if (!edgesId[`${v.info.from}-${v.info.to}`]) {
              edges.add({
                from: v.info.from, to: v.info.to, arrows: 'to', dashes: false
              })
              edgesId[`${v.info.from}-${v.info.to}`] = 1
            }
          }
        )
        window.network.stabilize()

        _.forOwn(multipleMaster, (value, key) => {
          console.log(key)
        })

      })

    }

    // create a network
    let container = document.getElementById('mynetwork')
    let data = {
      nodes: nodes,
      edges: edges
    }
    let options = {}
    window.network = new vis.Network(container, data, options)

    setInterval(() => {
      fn()
    }, 1000)

  }

  render () {
    return <Topology/>
  }
}

ReactDOM.render(<Container/>, document.getElementById('root'))