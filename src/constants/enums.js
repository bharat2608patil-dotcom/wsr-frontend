export const enums = {
  role: ['ADMIN', 'VP', 'DIRECTOR', 'DELIVERY_MANAGER', 'TEAM_LEAD', 'TEAM_MEMBER'],
  deliveryModel: ['ONSHORE', 'OFFSHORE', 'HYBRID'],
  projectStatus: ['ONGOING', 'ON_HOLD', 'TRANSITION', 'RAMP_UP', 'RAMP_DOWN', 'CLOSED', 'ACTIVE'],
  weeklyUpdateStatus: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'],
  approvalStatus: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'],
  riskType: ['RESOURCE', 'ENVIRONMENT', 'CLIENT_DEPENDENCY', 'TECHNICAL', 'SECURITY', 'OPERATIONAL', 'DELIVERY', 'COMPLIANCE'],
  riskSeverity: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
  riskStatus: ['OPEN', 'IN_PROGRESS', 'CLOSED'],
  blockerSeverity: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
  blockerStatus: ['OPEN', 'IN_PROGRESS', 'RESOLVED'],
  customerConnectFrequency: ['DAILY', 'WEEKLY', 'BI_WEEKLY', 'MONTHLY', 'QUARTERLY'],
  ragStatus: ['GREEN', 'AMBER', 'RED'],
}