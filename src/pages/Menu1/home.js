import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// CHART
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// DATATABLE
import DataTable from "react-data-table-component";
import { getPosts } from "../../api/api";

// CSS yang dipisah
import "./Menu1.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Leaflet Icon
const DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

// Koordinat
const jakarta = [-6.2088, 106.8456];
const bandung = [-6.9175, 107.6191];

const Menu1 = () => {
  const [postCounts, setPostCounts] = useState([]);
  const [chart2Data, setChart2Data] = useState({ labels: [], values: [] });
  const [tableData, setTableData] = useState([]);

  // FETCH API
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setTableData(posts);

      const counts = Array(10).fill(0);
      posts.forEach((item) => {
        if (item.userId >= 1 && item.userId <= 10) {
          counts[item.userId - 1] += 1;
        }
      });
      setPostCounts(counts);

      // Chart 2
      const userPostCounts = Array(10).fill(0);
      posts.forEach((p) => {
        if (p.userId >= 1 && p.userId <= 10) {
          userPostCounts[p.userId - 1] += 1;
        }
      });

      setChart2Data({
        labels: [
          "User 1",
          "User 2",
          "User 3",
          "User 4",
          "User 5",
          "User 6",
          "User 7",
          "User 8",
          "User 9",
          "User 10",
        ],
        values: userPostCounts,
      });
    };

    fetchPosts();
  }, []);

  // TABLE COLUMNS
  const columns = [
    { name: "User ID", selector: (row) => row.userId, sortable: true, width: "120px" },
    { name: "ID", selector: (row) => row.id, sortable: true, width: "100px" },
    { name: "Title", selector: (row) => row.title, sortable: true, wrap: true },
  ];

  return (
    <div className="menu1-container">

      {/* MAP */}
      <div className="box">
        <h3>Maps</h3>

        <MapContainer center={jakarta} zoom={6} className="map-container">
          <LayersControl position="topright">

            <LayersControl.BaseLayer checked name="Map 1">
              <LayerGroup>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={jakarta}>
                  <Popup>Jakarta</Popup>
                </Marker>
              </LayerGroup>
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Map 2">
              <LayerGroup>
                <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
                <Marker position={bandung}>
                  <Popup>Bandung</Popup>
                </Marker>
              </LayerGroup>
            </LayersControl.BaseLayer>

          </LayersControl>
        </MapContainer>
      </div>

      {/* CHARTS */}
      <div className="chart-grid">

        <div className="box">
          <h3>Chart 1</h3>
          <Bar
            data={{
              labels: [
                "User 1", "User 2", "User 3", "User 4", "User 5",
                "User 6", "User 7", "User 8", "User 9", "User 10",
              ],
              datasets: [
                {
                  label: "Jumlah Postingan",
                  data: postCounts,
                  borderWidth: 1,
                  backgroundColor: "rgba(0, 123, 255, 0.6)",
                  borderColor: "rgba(0, 123, 255, 1)",
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>

        <div className="box">
          <h3>Chart 2</h3>
          <Line
            data={{
              labels: chart2Data.labels,
              datasets: [
                {
                  label: "Jumlah Post",
                  data: chart2Data.values,
                  borderWidth: 2,
                  borderColor: "gray",
                  segment: {
                    borderColor: (ctx) => {
                      const prev = ctx.p0.parsed.y;
                      const next = ctx.p1.parsed.y;
                      return next > prev ? "green" : "red";
                    },
                  },
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>

      </div>

      {/* DATA TABLE */}
      <div className="box">
        <h3 className="table-title">Data Table</h3>
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          highlightOnHover
          striped
          dense
        />
      </div>
    </div>
  );
};

export default Menu1;
