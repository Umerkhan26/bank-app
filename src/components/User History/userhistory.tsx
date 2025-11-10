import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserHistory } from "../../services/auth";
import { jwtDecode } from "jwt-decode";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import {
  FaHome,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { IoPricetag, IoDocument, IoCalendar } from "react-icons/io5";

interface HistoryItem {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
  };
  description: string;
  points_earned: number;
  points_used: string;
  reference_id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface DecodedToken {
  userId: string;
  exp: number;
}

// Styled Components for Enhanced User History
const Container = styled.div`
  padding: 1rem;
  width: 100%;
  margin: 0 auto;
  background: #f8fafc;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  color: #1e293b;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatsCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  flex: 1;
  min-width: 80px;

  &:not(:last-child) {
    border-right: 1px solid #e2e8f0;
  }

  @media (max-width: 768px) {
    border-right: none;
    margin-bottom: 0.5rem;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const StatNumber = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: black;
  margin-bottom: 0.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatDescription = styled.span`
  font-size: 0.7rem;
  color: #64748b;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const HistoryContainer = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  font-size: 0.75rem;
`;

const Th = styled.th`
  background: #f8fafc;
  color: #64748b;
  padding: 0.5rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1.5px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
  color: #475569;
  white-space: nowrap;

  &:nth-child(2) {
    font-weight: 600;
    color: black;
  }
`;

const Tr = styled.tr`
  transition: background 0.2s;

  &:hover {
    background: #f8fafc;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0.4rem 0.8rem;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(79, 70, 229, 0.2);

  &:hover {
    background: rgb(77, 76, 90);
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(79, 70, 229, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.6rem;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #64748b;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.8rem;
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.6rem;
  gap: 6px;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.5rem;
  background: ${(props) => (props.disabled ? "#e2e8f0" : "black")};
  color: ${(props) => (props.disabled ? "#64748b" : "white")};
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 0.7rem;
  transition: all 0.3s ease;
  margin-bottom: 15px;

  &:hover:not(:disabled) {
    background: rgb(110, 107, 118);
  }

  @media (max-width: 768px) {
    padding: 0.2rem 0.4rem;
    font-size: 0.6rem;
  }
`;

const PageInfo = styled.span`
  color: #64748b;
  font-size: 0.7rem;
  margin: 0 0.4rem;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 1.5rem;
  color: #64748b;
`;

const IconCell = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const UserHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  let userId: string | null = null;

  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      userId = decoded.userId;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  useEffect(() => {
    const getHistory = async () => {
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserHistory(userId);
        setHistory(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getHistory();
  }, [userId]);

  const totalPointsEarned = history.reduce(
    (sum, item) => sum + item.points_earned,
    0
  );
  const totalActivities = history.length;
  const recentActivity =
    history.length > 0
      ? new Date(history[0].createdAt).toLocaleDateString()
      : "None";

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(history.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <Container>
        <Loading>
          <FaSpinner className="spinner" />
          Loading your activity history...
        </Loading>
      </Container>
    );

  if (error)
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Button onClick={() => navigate("/")}>
            <FaHome />
            Back to Home
          </Button>
        </div>
      </Container>
    );

  return (
    <Container>
      <Header>
        <Title>Activity History</Title>
        <Button onClick={() => navigate("/")}>
          <FaHome />
          Back to Home
        </Button>
      </Header>

      <StatsCard>
        <StatCard>
          <StatNumber>{totalPointsEarned}</StatNumber>
          <StatDescription>Total Points Earned</StatDescription>
        </StatCard>
        <StatCard>
          <StatNumber>{totalActivities}</StatNumber>
          <StatDescription>Total Activities</StatDescription>
        </StatCard>
        <StatCard>
          <StatNumber>{currentItems.length}</StatNumber>
          <StatDescription>Showing</StatDescription>
        </StatCard>
        <StatCard>
          <StatNumber>{recentActivity}</StatNumber>
          <StatDescription>Most Recent</StatDescription>
        </StatCard>
      </StatsCard>

      <HistoryContainer>
        {history.length === 0 ? (
          <EmptyState>
            <h3>No activity found</h3>
            <p>You haven't performed any activities yet.</p>
          </EmptyState>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>Points Earned</Th>
                  <Th>Point Used</Th>
                  <Th>Type</Th>
                  <Th>User Name</Th>
                  <Th>Date</Th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <Tr key={item._id}>
                    <Td>
                      <IconCell>
                        <IoDocument size={14} />
                        {item.points_earned}
                      </IconCell>
                    </Td>
                    <Td>
                      <IconCell>
                        <IoPricetag size={14} />
                        {item.points_used}
                      </IconCell>
                    </Td>

                    <Td>{item.type}</Td>
                    <Td>{item.user_id?.name}</Td>

                    <Td>
                      <IconCell>
                        <IoCalendar size={14} />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </IconCell>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>

            {totalPages > 1 && (
              <Pagination>
                <PageButton
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft size={10} />
                  Previous
                </PageButton>

                <PageInfo>
                  Page {currentPage} of {totalPages}
                </PageInfo>

                <PageButton
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <FaChevronRight size={10} />
                </PageButton>
              </Pagination>
            )}
          </>
        )}
      </HistoryContainer>
    </Container>
  );
};

export default UserHistory;
