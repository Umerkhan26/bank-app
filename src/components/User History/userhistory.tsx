import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserHistory } from "../../services/auth";
import { jwtDecode } from "jwt-decode";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import { FaHome, FaSpinner } from "react-icons/fa";

interface HistoryItem {
  _id: string;
  user_id: string;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 14px;
  overflow: hidden;
`;

const Th = styled.th`
  background: black;
  color: white;
  padding: 12px;
  text-align: left;
  font-size: 14px;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 13px;
  color: #333;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: -40px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: #003f7f;
  }
`;

const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: left;
  margin-bottom: 50px;
  font-weight: 800;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  text-align: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  background: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
  &:hover {
    background: #003f7f;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const UserHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <Loading>
        <FaSpinner className="spinner" />
        Loading...
      </Loading>
    );
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Title>User History</Title>
      {history.length === 0 ? (
        <p>No activity found.</p>
      ) : (
        <>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Description</Th>
                  <Th>Points Earned</Th>
                  <Th>Points Used</Th>
                  <Th>Reference ID</Th>
                  <Th>Type</Th>
                  <Th>Created At</Th>
                  <Th>Updated At</Th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <Td>{item.description}</Td>
                    <Td>{item.points_earned}</Td>
                    <Td>{item.points_used}</Td>
                    <Td>{item.reference_id}</Td>
                    <Td>{item.type}</Td>
                    <Td>{new Date(item.createdAt).toLocaleString()}</Td>
                    <Td>{new Date(item.updatedAt).toLocaleString()}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          <Pagination>
            <PageButton
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </PageButton>
            <PageButton
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= history.length}
            >
              Next
            </PageButton>
          </Pagination>
        </>
      )}
      <Button onClick={() => navigate("/")}>
        <FaHome />
        Back to Home
      </Button>
    </Container>
  );
};

export default UserHistory;
