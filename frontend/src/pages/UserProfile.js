import React, { useContext, useEffect, useState } from 'react';
import { List, ListItem, Divider, Typography, ListItemText } from '@mui/material';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { userContext } from '../userContext';

const UserProfile = () => {

    const {user} = useContext(userContext)
    const [donations, setDonations] = useState([])

    const [modalIsOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(0)
    const [justification, setJustification] = useState("")
    const [transactionID, setTransactionID] = useState(null)
    const [date, setDate] = useState(Date.now())

    const { id } = useParams();

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/donation/donator/' + userContext.id, {}, {}).then((response) => {
            console.log(response)
            setDonations(response.data)

        })
            .catch((error) => {
                console.log(error)
            });

    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND_URL + '/users/' + id + '/expenditure', {
            "value": value,
            "justification": justification,
            "date": "Wed Jan 26 2022 15:54:40 GMT+0000 (Western European Standard Time)",
            "transactionId": transactionID
        }, {}).then((response) => {
            console.log(response)
        })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <div
            style={{
                justifyContent: 'left',
                alignItems: 'left',
                height: '100vh',
                padding: "0.2rem calc((100vw - 1000px) / 7)",
                backgroundColor: "#f2f2f2"
            }}
        >
            
            {user != null ?
                <>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2%" }}>
                        <h2>{user.name}</h2>
                        <button onClick={openModal} style={{ backgroundColor: "#3c3c3c", color: "#fff", width: "7%", height: "50px" }}>
                            Edit Profile
                        </button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                        <h5>Current Ether:<span style={{ fontWeight: '400' }}> {user.currentEther}  </span></h5>
                        <h5>Total number of donations made:<span style={{ fontWeight: '400' }}> {user.donationsSentCounter}</span></h5>
                        <h5>Total value sent in donations:<span style={{ fontWeight: '400' }}> {user.totalCoinDonated} </span></h5>
                    </div>

                    <h5>Email: <span style={{ fontWeight: '400' }}>{user.email}</span></h5>
                    <h5>Public Address: <span style={{ fontWeight: '400' }}>{user.publicAddress}</span></h5>

                    <h3 style={{ marginTop: '3%' }}>Donations</h3>

                    <List sx={{ bgcolor: '#f2f2f2' }}>
                        {donations.map((donation) => {
                            return (
                                <>
                                    <ListItem alignItems="flex-start" style={{ backgroundColor: "#f2f2f2" }} >
                                        <ListItemText
                                            primary={"Donation ID: " + donation.id}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Donation Value: {donation.value}
                                                    </Typography> <p>
                                                        Donation Description: {donation.description}
                                                    </p>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="middle" component="li" />
                                    <Divider variant="middle" component="li" />
                                </>
                            )
                        })}
                    </List>
                </>
                :
                <>
                </>
            }
        </div>
    );
};

export default UserProfile;