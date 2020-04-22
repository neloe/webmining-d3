
const margin = ({top: 30, right: 0, bottom: 30, left: 40})
const height=500
const width=800

const data = [{name: "E", value: 0.12702},
{name: "T", value: 0.09056},
{name: "A", value: 0.08167},
{name: "O", value: 0.07507},
{name: "I", value: 0.06966},
{name: "N", value: 0.06749},
{name: "S", value: 0.06327},
{name: "H", value: 0.06094},
{name: "R", value: 0.05987}]

const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y))

const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0))

const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top])  
        
const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1)
 
//const data = Object.assign(d3.csvParse(await FileAttachment("alphabet.csv").text(), ({letter, frequency}) => ({name: letter, value: +frequency}))//.sort((a, b) => d3.descending(a.value, b.value)), {format: "%", y: "↑ Frequency"})


function chart () {

    const svg = d3.select('#mychart').attr('viewBox', [0,0,width, height])

    svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth())

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        return svg.node()
}

