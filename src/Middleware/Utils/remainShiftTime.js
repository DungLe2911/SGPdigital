export default function getRemainingShiftDuration() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    // Morning shift: 7:00 - 15:00
    if (currentHour >= 7 && currentHour < 15) {
        const shiftEnd = new Date(now);
        shiftEnd.setHours(15, 0, 0, 0);
        return shiftEnd - now; // milliseconds until 3PM
    }
    
    // Afternoon shift: 15:00 - 23:00
    else if (currentHour >= 15 && currentHour < 23) {
        const shiftEnd = new Date(now);
        shiftEnd.setHours(23, 0, 0, 0);
        return shiftEnd - now; // milliseconds until 11PM
    }
    
    // Night shift: 23:00 - 7:00 (next day)
    else {
        const shiftEnd = new Date(now);
        // If it's between midnight and 7AM, end time is today at 7AM
        // If it's between 11PM and midnight, end time is tomorrow at 7AM
        if (currentHour < 7) {
            shiftEnd.setHours(7, 0, 0, 0);
        } else {
            shiftEnd.setDate(shiftEnd.getDate() + 1);
            shiftEnd.setHours(7, 0, 0, 0);
        }
        return shiftEnd - now; // milliseconds until 7AM
    }
}
