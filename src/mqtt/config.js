import Paho from 'paho-mqtt/mqttws31'

const Config = {
  hostname: 'mqtt.cmmc.io',
  port: '9001',
  clientId: 'cmmc-ws-2947.9026.2017'
}

const Global = {
  mqtt: new Paho.MQTT.Client(Config.hostname, Number(Config.port), Config.clientId)
}

const mqtt = Global.mqtt

mqtt.publish = function (topic, payload, opts) {
  opts = opts || {}
  mqtt.send(topic, payload, opts.qos || 0, opts.retain || false)
}

const onConnected = function () {
  // console.log('connected')
  mqtt.subscribe('NAT/espnow/#', {qos: 0})
}

const onMessage = function (message) {
  // console.log('onmessage')
  const topic = message.destinationName
  const qos = message.qos
  const retained = message.retained
  const payloadString = message.payloadString

  /*
  console.log('Topic:     ' + topic)
  console.log('QoS:       ' + qos)
  console.log('Retained:  ' + retained)
  console.log('Message Arrived: ' + payloadString)
  */

  // console.log('onMessage')
  let obj = JSON.parse(payloadString)

  let master = obj.info.to
  if (objMaster[master] === undefined) {
    objMaster[master] = {children: {}}
  }

  objMaster[master].children[obj.info.from] = obj
  objMaster[master].children_array = _.values(objMaster[master].children)

  // console.log(objMaster);

}

// called when the client loses its connection
const onConnectionLost = function (responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log('onConnectionLost:' + responseObject.errorMessage)
  }
}

const onConnectFailure = function () {
  alert('mqtt connect failed')
}

function connectServer () {
  mqtt.connect({timeout: 10, onSuccess: onConnected, onFailure: onConnectFailure})
  mqtt.onMessageArrived = onMessage
  mqtt.onConnectionLost = onConnectionLost
}

connectServer()