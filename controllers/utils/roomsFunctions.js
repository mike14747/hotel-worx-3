function housekeepingStatus(queryParamsObj = null) {
    const baseObj = {
        active: 1,
        inactive: 0,
        clean: 1,
        dirty: 1,
        occupied: 1,
        vacant: 1,
        arrived: 0,
        departed: 0,
        stayover: 0,
        dueout: 0,
        notreserved: 0,
    };
    const paramsObj = { ...baseObj, ...queryParamsObj };
    paramsObj.active2 = parseInt(paramsObj.inactive) === 1 ? 0 : 1;
    paramsObj.clean2 = parseInt(paramsObj.dirty) === 1 ? 0 : 1;
    paramsObj.occupied2 = parseInt(paramsObj.vacant) === 1 ? 0 : 1;
    const conditionsArray = [];
    parseInt(paramsObj.arrived) === 1 && conditionsArray.push('(rr.checked_in=1 && rr.check_in_date=CURDATE() && rr.checked_out=0)');
    parseInt(paramsObj.departed) === 1 && conditionsArray.push('(rr.check_out_date=CURDATE() && rr.checked_out=1)');
    parseInt(paramsObj.stayover) === 1 && conditionsArray.push('(CURDATE()>rr.check_in_date && CURDATE()<rr.check_out_date)');
    parseInt(paramsObj.dueout) === 1 && conditionsArray.push('(rr.check_out_date=CURDATE() && rr.checked_out=0)');
    parseInt(paramsObj.notreserved) === 1 && conditionsArray.push('(rr.check_in_date IS NULL || (CURDATE() NOT BETWEEN rr.check_in_date AND rr.check_out_date))');
    if (conditionsArray.length > 0) {
        paramsObj.extraConditions = ' && (' + conditionsArray.join(' || ') + ')';
    } else {
        paramsObj.extraConditions = '';
    }
    return paramsObj;
}

module.exports = {
    housekeepingStatus,
};
