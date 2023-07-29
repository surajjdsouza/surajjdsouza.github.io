Vue.use(VueMaterial.default), new Vue({
  el: "#app",
  data: {
    timer: "",
    stations: {
      newark: {
        name: "Newark Penn",
        trainsNY: [],
		trainsNJ: []
      },
      harrison: {
        name: "Harrison",
        trainsNY: [],
      },
      journal_square: {
        name: "Journal Square",
        trainsNY: [],
		trainsNJ: []
      },
      grove_street: {
        name: "Grove Street",
        trainsNY: [],
		trainsNJ: []
      },
      exchange_place: {
        name: "Exchange Place",
        trainsNY: [],
		trainsNJ: []
      },
      world_trade_center: {
        name: "World Trade Center",
        trainsNY: [],
		trainsNJ: []
      },
      newport: {
        name: "Newport",
        trainsNY: [],
		trainsNJ: []
      },
      hoboken: {
        name: "Hoboken",
        trainsNY: [],
		trainsNJ: []
      },
      christopher_street: {
        name: "Christopher Street",
        trainsNY: [],
		trainsNJ: []
      },
      ninth_street: {
        name: "9th Street",
        trainsNY: [],
		trainsNJ: []
      },
      fourteenth_street: {
        name: "14th Street",
        trainsNY: [],
		trainsNJ: []
      },
      twenty_third_street: {
        name: "23rd Street",
        trainsNY: [],
		trainsNJ: []
      },
      thirty_third_street: {
        name: "33rd Street",
        trainsNY: [],
		trainsNJ: []
      }
    }
  },
  created: function() {
    this.fetchStations(), this.timer = setInterval(this.fetchStations, 5e3)
  },
  methods: {
    fetchStations: function() {
      for (var t in this.stations) this.$http.get("https://path.api.razza.dev/v1/stations/" + t + "/realtime").then(function(t) {
        return function(e) {
          this.stations[t].trainsNY = e.body.upcomingTrains.filter(function(t) {
		    return t.direction == "TO_NY"
		  }).sort((function(t, e) {
            return Date.parse(t.projectedArrival) - Date.parse(e.projectedArrival)
          })).map((function(t) {
            return {
              name: t.lineName,
              arrival_time: moment(Date.parse(t.projectedArrival)).fromNow(),
              color: "color:"+t.lineColors[0]+"!important",
              direction: t.direction
            }
          }))
          this.stations[t].trainsNJ = e.body.upcomingTrains.filter(function(t) {
		    return t.direction == "TO_NJ"
		  }).sort((function(t, e) {
            return Date.parse(t.projectedArrival) - Date.parse(e.projectedArrival)
          })).map((function(t) {
            return {
              name: t.lineName,
              arrival_time: moment(Date.parse(t.projectedArrival)).fromNow(),
              color: "color:"+t.lineColors[0]+"!important",
              direction: t.direction
            }
          }))
        }
      }(t))
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
});