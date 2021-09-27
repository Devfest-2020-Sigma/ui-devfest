// Enum listant l'ensemble des commandes d'une impression
export const RobotCommandEnum  = {
    PAUSE: ['GET', 'files/pause'],
    ANNULER: ['GET', 'files/cancel'],
    RESUME: ['POST', 'files/send'],
    STATUT: ['GET', 'status/getStatus'],
    RETURN2ZERO: ['GET', 'machine/returnToZero'],
    RESETTOZERO: ['GET', 'machine/resetToZero']
}