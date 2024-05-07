import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import CardforDashboard from "../cards/CardforDashboard";
import "./style.css";
import { Button, Container } from "react-bootstrap";
import { IoArrowUndoCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  Returndefaultlayout,
  addLayout,
  cleanLayout,
  removeLayout,
  saveCurentLayout,
} from "../../store/reducers/DashboardLayout";

const Dashboard_v2 = (props) => {
  const {
    items,
    moveChartToChat,
    moveChartToGallery,
    removeChartFromDashboard,
    deleteAWSClound,
    ...others
  } = props;
  const [compactType, setcompactType] = useState("vertical");
  const [mounted, setmounted] = useState(false);
  const defaultLayoutRedux = useSelector((state) => state.dashboardLayout);
  const dispatch = useDispatch();
  useEffect(() => {
    defaultLayout();
    setmounted(true);
    if (items.length === 0) {
      dispatch(cleanLayout());
    }
    return () => {
      setmounted(false);
    };
  }, [items]);

  const onCompactTypeChange = () => {
    const oldCompactType = compactType;
    const newcompactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    setcompactType(newcompactType);
  };

  const ResponsiveGridLayout = WidthProvider(Responsive);
  const handleLayoutChange = (layout, layouts) => {
    console.log("change dashboard");
    if (mounted) {
      dispatch(saveCurentLayout({ layout: layout }));
    }
  };
  const defaultLayout = () => {
    dispatch(cleanLayout());
    items.map((chart) => dispatch(addLayout({ data: chart[1] })));
  };

  return (
    <>
      <Button
        className="tooltip-btn-layout"
        onClick={defaultLayout}
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          bottom: "5%",
          right: "2%",
          zIndex: "1000",
          fontSize: "35px",
          borderRadius: "50px",
        }}
      >
        <IoArrowUndoCircleOutline />
        <span
          style={{ margin: "15%", fontSize: "15px", textTransform: "initial" }}
          className="tooltip-layout"
        >
          Default layout
        </span>
      </Button>
      <div />
      {items.length === 0 ? (
        <div
          style={{
            height: "87vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            color: "lightgray",
          }}
        >
          No charts available.
        </div>
      ) : (
        <Container fluid>
          <ResponsiveGridLayout
            layouts={{
              lg: defaultLayoutRedux.currentLayout,
            }}
            breakpoints={{ lg: 1200 }}
            cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
            rowHeight={150}
            width={1000}
            isBounded
            onLayoutChange={handleLayoutChange}
            // WidthProvider option
            measureBeforeMount={false}
            // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
            // and set `measureBeforeMount={true}`.
            useCSSTransforms={false}
            compactType={compactType}
            preventCollision={!compactType}
            droppingItem={{ i: "xx", h: 50, w: 250 }}
          >
            {items.map((ChartComponent, index) => (
              <div key={ChartComponent[1].timestamp + ChartComponent[1].title}>
                <CardforDashboard
                  id={index}
                  chart={items[index] ? ChartComponent[0] : null}
                  moveChartToChat={() => {
                    moveChartToChat(ChartComponent[0], ChartComponent[1]);
                    dispatch(removeLayout({ chart: ChartComponent[1] }));
                  }}
                  moveChartToGallery={() => {
                    moveChartToGallery(ChartComponent[0], ChartComponent[1]);
                    dispatch(removeLayout({ chart: ChartComponent[1] }));
                    props.savehistory();
                  }}
                  removeChartFromDashboard={() => {
                    removeChartFromDashboard(
                      ChartComponent[0],
                      ChartComponent[1]
                    );
                    dispatch(removeLayout({ chart: ChartComponent[1] }));
                  }}
                  deleteAWSClound={() => deleteAWSClound(ChartComponent[1])}
                />
              </div>
            ))}
          </ResponsiveGridLayout>
        </Container>
      )}
    </>
  );
};

export default Dashboard_v2;
