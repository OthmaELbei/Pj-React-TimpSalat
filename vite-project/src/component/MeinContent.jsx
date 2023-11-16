// import React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Prayer from "./Prayer";
import Stack from "@mui/material/Stack";

// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

export default function MeinContent() {
  const [slactCity, setSlactCity] = useState({
    displayName: "سطات",
    apiName: "Settat",
  });
  const [remainingTime, setRemainingTime] = useState("");
  const [today, setToday] = useState("");
  const [intervel, setIntervel] = useState("10");
  const avilabelCities = [
    {
      displayName: "سطات",
      apiName: "Settat",
    },
    {
      displayName: "الرباط",
      apiName: "Rabat",
    },
    {
      displayName: "الداربضاء",
      apiName: "Casablanca",
    },
    {
      displayName: "فاس",
      apiName: "Fez",
    },
    {
      displayName: "طنجة",
      apiName: "Tangier",
    },
    {
      displayName: "مركش",
      apiName: "Marrakesh",
    },
    {
      displayName: "سلا",
      apiName: "Salé",
    },
    {
      displayName: "مكناس",
      apiName: "Meknes",
    },
  ];
  const [nextPrayerIndex, setNextPrayerIndex] = useState(3);
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الضهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "12:59",
    Asr: "16:55",
    Maghrib: "20:12",
    Isha: "22:02",
  });

  const getTimings = async () => {
    const responso = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=MAR&city=${slactCity.apiName}`
    );
    console.log(responso);
    setTimings(responso.data.data.timings);
  };

  useEffect(() => {
    getTimings();
  }, [slactCity]);

  useEffect(() => {
    let interval = setIntervel(() => {
      console.log("clling timer");
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY |h:mm"));
    return () => {
      clearInterval(interval);
    };
  }, []);

  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 2;

    if (
      momentNow.isAfter(
        moment(timings["Fajr"], "hh:mm") &&
          momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
      )
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(
        moment(timings["Dhuhr"], "hh:mm") &&
          momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
      )
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(
        moment(timings["Asr"], "hh:mm") &&
          momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
      )
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(
        moment(timings["Maghrib"], "hh:mm") &&
          momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
      )
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setNextPrayerIndex(prayerIndex);

    const nextPrayerOpject = prayersArray[prayerIndex];
    const nextPrayerTimer = timings[nextPrayerOpject.key];
    const nextprayerTimeMoment = moment(nextPrayerTimer, "hh:mm");
    let remainingTime = moment(nextPrayerTimer, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextprayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      console.log(fajrToMidnightDiff);
      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDiffernce;
    }
    console.log(remainingTime);
    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.hours()}:${durationRemainingTime.minutes()}:${durationRemainingTime.seconds()}`
    );
  };

  const handleCityChange = (event) => {
    const cityObject = avilabelCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setSlactCity(cityObject);
  };

  return (
    <>
      {/* top role */}
      <Grid container>
        <Grid xs={6}>
          <h3>{today}</h3>
          <h4>{slactCity.displayName}</h4>
          <h3>{intervel}</h3>
        </Grid>
        <Grid xs={6}>
          <h3> المتبقي حت صلاة {prayersArray[nextPrayerIndex].displayName}</h3>
          <h2>{remainingTime}</h2>
        </Grid>
      </Grid>
      {/* == top role == */}
      <Divider style={{ borderColor: "wheat", opacity: "0.2" }} />
      {/* Top Prayer */}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "50px" }}
      >
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2"
        />
        <Prayer
          name="الضهر"
          time={timings.Dhuhr}
          image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921"
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"
        />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d"
        />
      </Stack>

      {/* == Top Prayer == */}
      {/* top selact */}
      <Stack direction="row" style={{ justifyContent: "center" }}>
        <FormControl fullWidth style={{ width: "20%", marginTop: "40px" }}>
          <InputLabel style={{ color: "wheat" }} id="demo-simple-select-label">
            المدينة
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ color: "wheat" }}
            // value={age}
            // label="Age"
            onChange={handleCityChange}
          >
            {avilabelCities.map((city) => {
              return (
                <MenuItem key={city.apiName} value={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* == selact == */}
    </>
  );
}
