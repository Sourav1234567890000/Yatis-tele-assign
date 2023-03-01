// // FETCH API
 
// const URL = "https://api.yatis.io/api/getLocationInterval?deviceId=FM357544373242888&api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjBhNzE3ZDM5OTRkNjA3N2RjZTMxMzYiLCJleHAiOjE2NzUyNDcxMTc4Njl9.SWNKiYtLhqwHdzJ2RL5Dsx-910GFIkoKGNBUIeHmMzc&startDate=2023-02-01&endDate=2023-02-02"
// fetch(URL)
// // console.log(ret)
// .then(response => {
//     return response.json()
// })

// .then(data => {
//     console.log(data)
// })



const api = "https://api.yatis.io/api/getLocationInterval";

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjBhNzE3ZDM5OTRkNjA3N2RjZTMxMzYiLCJleHAiOjE2NzUyNDcxMTc4Njl9.SWNKiYtLhqwHdzJ2RL5Dsx-910GFIkoKGNBUIeHmMzc";
  

let data = "" 

const button = document.getElementById("Fetch-button");
// console.log(button)
const id = document.getElementById("deviceId");
// console.log(id);
const sdate = document.getElementById("startDate");
// console.log(sdate);
const edate = document.getElementById("endDate");
// console.log(edate)


button.addEventListener("click", function () {
  // edate.preventDefault();
  const deviceId = id.value;
  const startDate = sdate.value.toLocaleString().replace("/","-");
  const endDate = edate.value.toLocaleString().replace("/","-");

  const apiGen = `${api}/?deviceId=${deviceId}&api_access_token=${accessToken}&startDate=${startDate}&endDate=${endDate}`;

  data = fetchData(apiGen);

  console.log(data)
  console.log({ startDate, endDate, deviceId });
});
   

// aysnc function to fetch data
async function fetchData(apiGen) {
    const response = await fetch(apiGen);
    const tempData = await response.json();
    data = await tempData.locationInfo.map((obj) => {
      return [ obj.timestamp, obj.params[66]];
    });
    console.log(tempData);
    plotGraph(data);
  }


  // d3 scatterplot


  // setting margin
function plotGraph(graphData) {
    const svg = d3.select("svg");
    const margin = 200;
    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;
  
    // setting scale
    const xScale = d3.scaleTime().domain([
        new Date(graphData[0][0] - 3000),
        new Date(graphData[graphData.length - 1][0]),
      ])
      .range([0, width]);

    const yScale = d3.scaleLinear().domain([10000, 15000]).range([height, 0]);
    const g = svg
      .append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");
  
    // adding title
    svg
      .append("text")
      .attr("x", width / 2 + 100)
      .attr("y", 100)
      .attr("text-anchor", "middle")
      .style("font-size", 20)
      .text("Voltage vs Time");
  
    // X label
    svg
      .append("text")
      .attr("x", width / 2 + 100)
      .attr("y", height - 15 + 150)
      .attr("text-anchor", "middle")
      .style("font-size", 12)
      .text("Time");
  
    // y label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(50," + (height - 100) + ")rotate(-90)")
      .style("font-size", 12)
      .text("Voltage");
  
    // adding axis
    g.append("g")
      .attr("transform", "translate(0, " + height + ")")
      .call(d3.axisBottom(xScale));
    g.append("g").call(d3.axisLeft(yScale));
  
    // scattering dots
    svg
      .append("g")
      .selectAll("dot")
      .data(graphData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 7)
      .attr("transform", "translate(" + 100 + "," + 100 + ")")
      .style("fill", "#cc556B2F");
  }
  





