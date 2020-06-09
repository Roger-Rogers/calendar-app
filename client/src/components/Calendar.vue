<template>
  <div class="align-content-center m-5">
    <v-btn fab text small color="grey darken-2" @click="prev">
      <v-icon small>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn fab text small color="grey darken-2" @click="next">
      <v-icon small>mdi-chevron-right</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-calendar
      ref="calendar"
      v-model="focus"
      color="primary"
      :events="events.date"
      :event-color="getEventColor"
      :now="today"
      :type="type"
      @click:event="showEvent"
      @click:more="viewDay"
      @click:date="viewToggle"
      @change="updateRange"
    />
  </div>
</template>

<script>
import User from "../apis/User";
import Availibility from "../apis/Availibility";
export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day"
    },
    today: new Date().date,
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      
    ]
  }),
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "CST",
        month: "long"
      });
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
    User.auth().then(response => {
      Availibility.useravail(response.data.email).then(response => {
        this.events = response.data;
      });
    });
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    viewMonth({ date }) {
      this.focus = date;
      this.type = "month";
    },
    viewToggle({ date }) {
      this.focus = date;
      this.type == "month" ? (this.type = "day") : (this.type = "month");
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    /*
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: this.formatDate(first, !allDay),
            end: this.formatDate(second, !allDay),
            color: this.colors[this.rnd(0, this.colors.length - 1)],
          })
        }

        this.start = start
        this.end = end
        this.events = events
      },*/
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  }
};
</script>

<style></style>
