import React from 'react';
import './Scroll.css'


const ScrollableTableComponent = () => {
    return (

        <div className="Tabcontainer">
            <div className="scrollable">
                <table className="t1">
                    <thead>
                        <tr style={{ position: 'sticky' }}>
                            <th>Like</th>
                            <th>Dislike</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Lifts are working fine, CCTV also working fine in our society, overall my society is very good.</td>
                            <td>Visitors parking is a big area of concern here action should be taken for this.</td>
                        </tr>
                        <tr>
                            <td>The lifts are quite good ,cleanieness is also fine .ccyv are aslo working fine in the socity</td>
                            <td>No security guards as well as no supervisorr. Safety is very poor. No connectivity.</td>
                        </tr>
                        <tr>
                            <td>Safety is fine, security guards are working good. Shops are good in society market.</td>
                            <td>visitors parking should be improved. Cleaning should be also taken care of in our society.</td>
                        </tr>
                        <tr>
                            <td>The parking inside the society is really nice, security is also pretty good in our society.</td>
                            <td>The roads outside the gate is bad and people park infront of the gate. Market infron of the gate which causes chaos.</td>
                        </tr>
                        <tr>
                            <td>The flats are very Spacious flats and society also have good ventilation system.</td>
                            <td>The parking area is very small and i really get irritated with this and also got late most of the time because of this.</td>
                        </tr>
                        <tr>
                            <td>Society has lot of open spce, club area are beautiful, parking facilities are well maintened. Best part is that our society have connectivity from highway.</td>
                            <td>I am not satisfied with the houskeeping facility, Overall the society is good, but the society need to work on Houskeeping facilities.</td>
                        </tr>
                        <tr>
                            <td>My society have good open space, Cleanliness is good taken care of and also I am happy with the parking space.</td>
                            <td>Society basement is poorly constructed, leakage issue in the basement most of the time. Lift is also not good.</td>
                        </tr>
                        <tr>
                            <td>The market place in our society is quite good. Happy with the 24/7 water supply service in my society.</td>
                            <td>The big concern in my society is parking. Cleanliness is poor. Also lifts are not enough.</td>
                        </tr>
                        {/* Add more rows if needed */}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ScrollableTableComponent;
