<template>
<div :class="[count]">
  <div class="rider-details">
    <div class="player-stats">
      <h1 class="player-name white">Player {{id}}: {{name}} <button @click="start" class="connect">
        <img src="../assets/bluetooth.svg" alt="bluetooth"/>
      </button></h1>
      <button @click="test">TEST</button>
      <div class="power-wrapper">
        <h2>Power:</h2>
        <div class="total-power white">

          Total: {{ power.total_power }}
          <font-awesome-icon icon="bolt" />
        </div>
        <div class="current-power white" :class="resistance">
          Current: {{ power.current_power }}
          <font-awesome-icon icon="bolt" />
        </div>
      </div>
    </div>
    <la-cartesian :data="power.powerData" class="power-graph" :width="1680">
      <la-line curve animated prop="value"></la-line>
    </la-cartesian>
  </div>

    <div>
      <div class="road">
        <div class="cyclist" :style="{'margin-left': position+ '%'}">
          <div class="tag">{{name}}</div>
          <div id="bm"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cartesian, Line } from 'laue';
import bodymovin from 'bodymovin';
import ws from '../utils/ws';

export default {
  components: {
    LaCartesian: Cartesian,
    LaLine: Line,
  },
  props: {
    count: Number,
    id: Number,
    record: Boolean,
    name: String,
    startTime: Object,
  },
  mounted() {
    this.$nextTick(() => {
      const bmContainer = document.querySelector(`.rider--${this.id} #bm`);
      const animation = bodymovin.loadAnimation({
        container: bmContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/49240/bike.json',
      });
      animation.setSpeed(0);
      this.animation = animation;
    });
  },
  data() {
    return {
      animation: null,
      position: 0,
      resistance: 10,
      finished: false,
      target_power: 5000,
    };
  },
  computed: {
    power() {
      return this.$store.getters.power(this.id);
    },
  },
  methods: {
    start() {
      navigator.bluetooth.requestDevice({ filters: [{ services: ['cycling_power'] }] })
        .then((device) => device.gatt.connect())
        .then((server) => server.getPrimaryService('cycling_power'))
        .then((service) => service.getCharacteristic('cycling_power_measurement'))
        .then((characteristic) => characteristic.startNotifications())
        .then((characteristic) => {
          characteristic.addEventListener('characteristicvaluechanged', this.handleCharacteristicValueChanged.bind(this));
        })
        .catch((error) => console.log(error));
    },
    handleCharacteristicValueChanged(event) {
      const { value } = event.target;
      const index = 1;
      const power = value.getInt16(index);
      this.current_power = power;
      if (this.record && !this.finished) {
        this.animation.setSpeed(power / 100);
        const wsData = {
          data: {
            id: this.id,
            power,
          },
          method: 'addPower',
        };
        console.log('sending message to ws with data of', wsData);
        ws.send(JSON.stringify(wsData));
        // this.total_power += power;
        // this.powerData.push({ value: power });
      }
    },
    test() {
      const power = 1000;
      const wsData = {
        data: {
          id: this.id,
          power,
        },
        method: 'addPower',
      };
      console.log('sending message to ws with data of', wsData);
      ws.send(JSON.stringify(wsData));
      if (this.record && !this.finished) {
        this.animation.setSpeed(power / 100);
        // this.total_power += power;
        // this.powerData.push({ value: power });
      }
    },
  },
  watch: {
    power(power) {
      if (power.total_power !== 0) {
        const percent = (power.total_power / this.target_power) * 100;
        this.position = (percent > 92.7) ? 92.7 : percent;
      }

      if (power.total_power >= this.target_power) {
        this.animation.setSpeed(0);
        this.$store.dispatch('finished', this.name);
      }
    },
  },
};

</script>
