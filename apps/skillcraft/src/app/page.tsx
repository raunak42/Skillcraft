"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  avatar: string | null;
  username: string;
  hashed_password: string;
  email: string | null;
  purchasedCourses: Course[]; // Define the Course interface or type
}

interface Course {
  id: string;
  title: string;
}

function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/getCourses", {
          method: "GET", // Adjusted for POST request
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error(error);
        // setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle loading and error states
  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Display users and their purchased courses (assuming courses are rendered within User component)
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <User key={user.id} user={user} /> // Pass user data to User component
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;

function User({ user }: { user: User }) {
  return (
    <li>
      <h2>{user.username}</h2>
      <p>ID: {user.id}</p>
      <p>Avatar: {user.avatar || "No avatar available"}</p>
      <p>Email: {user.email || "No email provided"}</p>
      {/* Display purchased courses if relevant for the UI */}
      {user.purchasedCourses.length > 0 && (
        <ul>
          <h4>Purchased Courses:</h4>
          {user.purchasedCourses.map((course) => (
            <li key={course.id}>{course.title}</li> // Assuming course.title exists
          ))}
        </ul>
      )}
    </li>
  );
}
