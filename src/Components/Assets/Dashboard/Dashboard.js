import { React, useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Container from "@mui/material/Container";
import { endpoints } from "../../../defaults";
import useApi from "../../../hooks/useApi";
import CoursesOnBoardingForm from "../Courses/CoursesOnBoardingForm";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/esm/ToastHeader";
import ToastBody from "react-bootstrap/esm/ToastBody";

const StyledContainer = styled(Container)`
  padding-top: 50px;
`;

const StyledTypography = styled(Typography)`
  margin-top: 50px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const StyledGridContainer = styled(Grid)`
  margin-top: 20px;
`;

const StyledCard = styled(Card)`
  max-width: 345;
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [result1, setResult] = useState();
  const { request: getCourses } = useApi("get");
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataLoaded) {
      fetchCourses();
    }
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const apiResponse = await getCourses(endpoints.VIEW_COURSE);
    const { response, error } = apiResponse;
    if (!error && response.data) {
      const { data: apiData } = response;
      setData(apiData.data);
      console.log(apiData);
    } else {
      const { response: errRes } = error;
      <Toast>
        <ToastHeader title="Error" icon="Cancel" iconColor="danger" time="Now">
          <ToastBody>
            {errRes?.data?.message || "Error Occured. Please contact Admin !!"}
          </ToastBody>
        </ToastHeader>
      </Toast>;
    }
    setDataLoaded(true);
    setLoading(false);
  };
  const handleEdit = (result) => {
    setResult(result);
    setShowEditForm(true);
  };

  const handleCreate = () => navigate("/courseCreate");

  return (
    <>
      {showEditForm ? (
        <CoursesOnBoardingForm result={result1} />
      ) : (
        <StyledContainer maxWidth="lg">
          <StyledTypography variant="h4" align="center">
            Courses
          </StyledTypography>
          <StyledButtonContainer>
            <button
              type="submit"
              class="btn btn-success"
              onClick={handleCreate}
            >
              Create New Course
            </button>
          </StyledButtonContainer>
          <StyledGridContainer container spacing={5} className="p-5  ">
            {data.map((result, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StyledCard className="bg-dark">
                  <CardContent className="card border-dark mb-3">
                    <Typography gutterBottom variant="h5" component="div">
                      {result.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Next Batch @ Cochin: {result.cochin_date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Next Batch @ Calicut: {result.calicut_date}
                    </Typography>
                  </CardContent>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(result)}
                  >
                    Edit
                  </Button>
                </StyledCard>
              </Grid>
            ))}
          </StyledGridContainer>
        </StyledContainer>
      )}
    </>
  );
};

export default Dashboard;
