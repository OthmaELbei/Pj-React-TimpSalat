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
import { useState, useEffect } from "react";

export default function MeinContent() {
  const [slactCity, setSlactCity] = useState({
    displayName: "سطات",
    apiName: "Settat",
  });
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
          <h3>4:20 | 2023 9 سبتمبر</h3>
          <h4>{slactCity.displayName}</h4>
        </Grid>
        <Grid xs={6}>
          <h3>المتبقي حتى صلاة العصر</h3>
          <h2>00:10:20</h2>
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
                <MenuItem value={city.apiName}>{city.displayName}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* == selact == */}
    </>
  );
}
