<template>
  <div class="TimeAndEmployee">
  
  <div id="datetime"> Login to see time </div> <br>
  <div id="bemp">Burger Maker:<br>
    <div class="text"> No Employee logged in </div> 
  </div>
  <button id="bbtn" v-on:click="bpromptFunction(); startTime()">Employee Login</button><br><br>
  <div id="semp">Stock refiller:<br> 
    <div class="text"> No Employee logged in</div>
  </div>
  <button id="sbtn" v-on:click="spromptFunction(); startTime()">Employee Login</button>
  <br>
  <NextButtonKitchen v-on:next="next"/>
  </div>
</template>
<script>
import NextButtonKitchen from "../components/NextButtonKitchen";
export default {
  name: 'TimeAndEmp',
  components: {
    NextButtonKitchen
  },
  props: {
    uiLabels: Object,
    lang: String,
  },
    computed: {
    },
  methods: {
   startTime: function() {
        var today = new Date();
        var d = today.getDate();
        var mo = today.getMonth()+1;
        var y = today.getFullYear();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        d = this.checkTime(d);
        mo = this.checkTime(mo);
        m = this.checkTime(m);
        s = this.checkTime(s);
        document.getElementById('datetime').innerHTML =
        h + ":" + m + ":" + s + 
        "\n" + d + "/" + mo + "/" + y ;
        const t = setTimeout(this.startTime, 500);
   },
    checkTime: function(i) {
        if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
        return i;
    },
    bpromptFunction: function() {
        var txt;
        var empno = prompt("Burger Maker: Please enter your Employee code:", "XXXXXXX");
        if (empno == null || empno == "" || empno == "XXXXXXX") {
            txt = "No Employee logged in";
            document.getElementById("bbtn").innerHTML = "Employee Login"
            document.getElementById("datetime").innerHTML = "Login to see time"
        } else {
            txt = "Burger Maker:<br> " + empno;
            document.getElementById("bbtn").innerHTML = "Switch Employee(s)"
        }
        document.getElementById("bemp").innerHTML = txt;
    },
    spromptFunction: function() {
        var txt;
        var empno = prompt("Stock refiller: Please enter your Employee code:", "XXXXXXX");
        if (empno == null || empno == "" || empno == "XXXXXXX") {
            txt = "No Employee logged in";
            document.getElementById("sbtn").innerHTML = "Employee Login"
            document.getElementById("datetime").innerHTML = "Login to see time"
        } else {
            txt = "Stock refiller:<br> " + empno;
            document.getElementById("sbtn").innerHTML = "Switch Employee(s)"
        }
        document.getElementById("semp").innerHTML = txt;
    },
      next: function() {
          this.$emit('next');
      }
  }
}
</script>
<style scoped>
 .TimeAndEmployee {
     width: 30vw;
     padding: 5px;
     font-family: Comfortaa, sans-serif;
     text-align: center;
 }
 #bbtn, #sbtn {
    margin-top: 10px;
    background: lightgrey;
    border: 2px solid grey;
    border-radius: 8px;
    padding: 5px;
    outline: none;
}
#bbtn:active, #sbtn:active {
    background: grey;
}
#datetime {
    font-size: 0.7em;
}
#bemp, #semp {
    font-size: 0.7em;
}
.text {
    padding-top: 5px;
    font-size: 0.8em;
    color: grey;
}
</style>