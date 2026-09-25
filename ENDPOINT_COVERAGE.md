# Backend endpoint coverage

All paths below are implemented under `src/api/modules` and return the backend Axios response so the shared response utilities can unwrap `response.data.data`.

- [x] Auth: `POST /api/auth/login`, `GET /api/auth/me`, `PUT /api/auth/change-password`
- [x] Users: `POST /api/users`, `GET /api/users`, `GET /api/users/{userId}`, `PUT /api/users/{userId}`, `DELETE /api/users/{userId}`
- [x] Teams: `POST /api/teams`, `GET /api/teams`, `GET /api/teams/{teamId}`, `PUT /api/teams/{teamId}`, `DELETE /api/teams/{teamId}`
- [x] Projects: `POST /api/projects`, `GET /api/projects`, `GET /api/projects/{projectId}`, `GET /api/projects/search`, `PUT /api/projects/{projectId}`, `DELETE /api/projects/{projectId}`
- [x] Weekly updates: `POST /api/weekly-updates`, `GET /api/weekly-updates/{weeklyUpdateId}`, `GET /api/weekly-updates/project/{projectId}`, `PUT /api/weekly-updates/{weeklyUpdateId}`, `DELETE /api/weekly-updates/{weeklyUpdateId}`
- [x] Achievements: `POST /api/achievements`, `GET /api/achievements/project/{projectId}`, `PUT /api/achievements/{achievementId}`, `DELETE /api/achievements/{achievementId}`
- [x] Risks: `POST /api/risks`, `GET /api/risks/{riskId}`, `GET /api/risks/project/{projectId}`, `PUT /api/risks/{riskId}`, `DELETE /api/risks/{riskId}`
- [x] Blockers: `POST /api/blockers`, `GET /api/blockers/project/{projectId}`, `PUT /api/blockers/{blockerId}`, `DELETE /api/blockers/{blockerId}`
- [x] Customer connects: `POST /api/customer-connects`, `GET /api/customer-connects/project/{projectId}`, `PUT /api/customer-connects/{customerConnectId}`, `DELETE /api/customer-connects/{customerConnectId}`
- [x] Dashboards: `GET /api/dashboard/team-lead/{userId}`, `GET /api/dashboard/delivery-manager/{userId}`, `GET /api/dashboard/executive`
- [x] Notifications: `GET /api/notifications/user/{userId}`, `PATCH /api/notifications/{notificationId}/read`
- [x] WSR reports: `POST /api/wsr-reports`, `GET /api/wsr-reports`, `POST /api/wsr-reports/{reportId}/submit`, `POST /api/wsr-reports/{reportId}/approve/{approverId}`, `POST /api/wsr-reports/{reportId}/reject/{approverId}`, `GET /api/wsr-reports/{reportId}`, `GET /api/wsr-reports/{reportId}/details`

## Run

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to the backend host, for example `http://localhost:8080`.
2. Run `npm install`.
3. Run `npm run dev`.

Auth payloads now match the documented DTOs exactly: login sends `{ email, password }`; change password sends `{ currentPassword, newPassword, confirmPassword }`.
