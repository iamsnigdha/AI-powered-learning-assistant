import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/Auth/NotFoundPage';
import DashboardPage from './pages/Auth/Quizzes/DashboardPage';
import DocumentListPage from './pages/Auth/Documents/DocumentListPage';
import DocumentDetailPage from './pages/Auth/Documents/DocumentDetailPage';

import FlashcardListPage from "./pages/Auth/Flashcards/FlashcardListPage";
import FlashcardPage from './pages/Auth/Flashcards/FlashcardPage';

import QuizTakePage from './pages/Auth/Quizzes/QuizTakePage';
import QuizResultPage from './pages/Auth/Quizzes/QuizResultPage';

import ProfilePage from './pages/Auth/Profile/ProfilePage';
import ProtectedRoute from "./components/auth/ProtectedRoute";
const App =() => {
const isAuthenticated = false
const loading = false

if (loading){
return (
<div className="flex items-center justify-center h-screen">
<p>Loading...</p>
</div>
);
}
return (
<Router>
<Routes>
<Route
path="/"
element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
/>
<Route path="/login" element= {<LoginPage />} 
/>
<Route path="/register" element= {<RegisterPage />} 
/>

{/* Protected Routes */}
<Route element= {<ProtectedRoute />}>
<Route path="/dashboard " element = {<DashboardPage />} />
<Route path="/documents " element = {<DocumentListPage />} />
<Route path="/documents/:id" element = {<DocumentDetailPage />} />
<Route path="/flashcards " element = {<FlashCardsListPage />} />
<Route path="/flashcards" element={<FlashCardsListPage />} />
<Route path="/quizzess/:quizId" element = {<QuizTakePage />} />
<Route path="/quizzess/:quizId/results" element = {<QuizResultPage />} />
<Route path="/profile" element = {<ProfilePage />} />
</Route>


<Route path="*" element= {<NotFoundPage />} 
/>
</Routes>
</Router>
);
}
export default App