import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [resources, setResources] = useState([]);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    loadDashboardData();

    // Update dashboard if localStorage changes
    const handleStorageChange = () => {
      loadDashboardData();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const loadDashboardData = () => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("app_tasks") || "[]");

      const storedResources = JSON.parse(
        localStorage.getItem("app_resources") || "[]",
      );

      const storedNotes = JSON.parse(
        localStorage.getItem("techmaster_notes") || "[]",
      );

      const storedUser = JSON.parse(
        localStorage.getItem("app_user_profile") || "{}",
      );

      setTasks(Array.isArray(storedTasks) ? storedTasks : []);
      setResources(Array.isArray(storedResources) ? storedResources : []);
      setNotes(Array.isArray(storedNotes) ? storedNotes : []);
      setUser(storedUser || {});
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  /*
   * Different projects sometimes save completed status
   * using different property names.
   *
   * This helper makes the dashboard flexible.
   */
  const isTaskCompleted = (task) => {
    return (
      task.completed === true ||
      task.isCompleted === true ||
      task.done === true ||
      task.status === "completed" ||
      task.status === "Completed" ||
      task.status === "done" ||
      task.status === "Done"
    );
  };

  const completedTasks = useMemo(() => {
    return tasks.filter(isTaskCompleted);
  }, [tasks]);

  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => !isTaskCompleted(task));
  }, [tasks]);

  const taskProgress = useMemo(() => {
    if (tasks.length === 0) return 0;

    return Math.round((completedTasks.length / tasks.length) * 100);
  }, [tasks, completedTasks]);

  /*
   * Get the latest tasks.
   * If the task has a createdAt/date field we use it.
   * Otherwise we keep the original order.
   */
  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => {
        const dateA = new Date(
          a.createdAt || a.created_at || a.date || 0,
        ).getTime();

        const dateB = new Date(
          b.createdAt || b.created_at || b.date || 0,
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 4);
  }, [tasks]);

  const getTaskTitle = (task) => {
    return task.title || task.name || task.taskName || "Untitled Task";
  };

  const getTaskPriority = (task) => {
    return task.priority || "Medium";
  };

  const getTaskStatus = (task) => {
    if (isTaskCompleted(task)) {
      return "Done";
    }

    return task.status || "Pending";
  };

  const getUserName = () => {
    if (user.fullName) {
      return user.fullName.split(" ")[0];
    }

    if (user.name) {
      return user.name.split(" ")[0];
    }

    return "Menna";
  };

  const formatDate = () => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date());
  };

  const handleQuickAction = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-page">
      {/* ================= HEADER ================= */}
      <div className="dashboard-welcome">
        <div>
          <h1>
            Good morning, {getUserName()}
            <span className="wave">👋</span>
          </h1>

          <p>Here's your learning progress today.</p>
        </div>

        <div className="dashboard-date">{formatDate()}</div>
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="dashboard-stats">
        {/* Today's Progress */}
        <div className="stat-card">
          <span className="stat-label">Today's Progress</span>

          <h2>
            {completedTasks.length} <span>/ {tasks.length}</span>
          </h2>

          <p>tasks completed</p>

          <div className="stat-bottom blue-text">
            <span>↗</span>
            Keep going
          </div>
        </div>

        {/* Learning Progress */}
        <div className="stat-card">
          <span className="stat-label">Learning Progress</span>

          <h2 className="green-number">{taskProgress}%</h2>

          <p>overall task progress</p>

          <div className="stat-bottom green-text">
            <span>↗</span>
            Based on your tasks
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="stat-card">
          <span className="stat-label">Completed Tasks</span>

          <h2>{completedTasks.length}</h2>

          <p>tasks completed</p>

          <div className="stat-bottom purple-text">
            <span>✓</span>
            Great work
          </div>
        </div>

        {/* Resources + Notes */}
        <div className="stat-card">
          <span className="stat-label">Your Content</span>

          <h2>{resources.length + notes.length}</h2>

          <p>
            {resources.length} resources · {notes.length} notes
          </p>

          <div className="stat-bottom orange-text">
            <span>+</span>
            Keep learning
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="dashboard-main-grid">
        {/* ================= RECENT TASKS ================= */}
        <div className="dashboard-card recent-tasks-card">
          <div className="card-header">
            <div>
              <h3>Recent Tasks</h3>
              <p>Your latest assignments</p>
            </div>

            <button
              className="view-all-btn"
              onClick={() => navigate("/tasks")}
            >
              View all →
            </button>
          </div>

          <div className="tasks-list">
            {recentTasks.length > 0 ? (
              recentTasks.map((task, index) => {
                const completed = isTaskCompleted(task);

                return (
                  <div
                    className={`task-row ${completed ? "task-completed" : ""}`}
                    key={task.id || index}
                  >
                    <div className={`task-check ${completed ? "checked" : ""}`}>
                      {completed && "✓"}
                    </div>

                    <div className="task-info">
                      <span className="task-title">{getTaskTitle(task)}</span>
                    </div>

                    <span
                      className={`priority-badge ${getTaskPriority(task)
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {getTaskPriority(task)}
                    </span>

                    <span
                      className={`status-badge ${getTaskStatus(task)
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {getTaskStatus(task)}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">
                <p>No tasks yet.</p>

                <button onClick={() => navigate("/tasks")}>
                  Add your first task
                </button>
              </div>
            )}
          </div>

          <button
            className="add-task-btn"
            onClick={() => navigate("/tasks")}
          >
            <span>+</span>
            Add New Task
          </button>
        </div>

        {/* ================= LEARNING PROGRESS ================= */}
        <div className="dashboard-card progress-card">
          <div className="card-header">
            <div>
              <h3>Learning Progress</h3>
              <p>Based on your tasks</p>
            </div>
          </div>

          <div className="progress-circle-container">
            <div
              className="progress-circle"
              style={{
                "--progress": `${taskProgress * 3.6}deg`,
              }}
            >
              <div className="progress-circle-inner">
                <strong>{taskProgress}%</strong>
                <span>Progress</span>
              </div>
            </div>
          </div>

          <div className="progress-details">
            <ProgressBar label="Completed Tasks" percentage={taskProgress} />

            <ProgressBar
              label="Pending Tasks"
              percentage={
                tasks.length
                  ? Math.round((pendingTasks.length / tasks.length) * 100)
                  : 0
              }
            />

            <ProgressBar
              label="Resources"
              percentage={resources.length > 0 ? 100 : 0}
            />

            <ProgressBar
              label="Notes"
              percentage={notes.length > 0 ? 100 : 0}
            />
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <section className="quick-actions-section">
        <div className="quick-actions-header">
          <div>
            <h3>Quick Actions</h3>
            <p>Manage your learning content quickly</p>
          </div>
        </div>

        <div className="quick-actions-grid">
          <button
            className="quick-action"
            onClick={() => handleQuickAction("/tasks")}
          >
            <div className="quick-action-icon task-icon">+</div>

            <div>
              <strong>Add Task</strong>
              <span>Create a new task</span>
            </div>

            <span className="action-arrow">→</span>
          </button>

          <button
            className="quick-action"
            onClick={() => handleQuickAction("/resources")}
          >
            <div className="quick-action-icon resource-icon">+</div>

            <div>
              <strong>Add Resource</strong>
              <span>Save a learning resource</span>
            </div>

            <span className="action-arrow">→</span>
          </button>

          <button
            className="quick-action"
            onClick={() => handleQuickAction("/notes")}
          >
            <div className="quick-action-icon note-icon">+</div>

            <div>
              <strong>Add Note</strong>
              <span>Write a new note</span>
            </div>

            <span className="action-arrow">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ================= PROGRESS BAR ================= */

function ProgressBar({ label, percentage }) {
  return (
    <div className="progress-item">
      <div className="progress-item-header">
        <span>{label}</span>
        <strong>{percentage}%</strong>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
