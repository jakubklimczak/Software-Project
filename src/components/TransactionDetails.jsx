import { Link } from "react-router-dom";
import Book from "./Book.jsx";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios';



function TransactionDetails(props) {
    const [transactionId, setTransactionID] = useState(props.detailsKey);
    const [username, setUsername] = useState(props.user);
    const [title, setTitle] = useState(props.title);
    const [author, setAuthor] = useState(props.author);
    const [isbn, setIsbn] = useState(props.isbn);
    const [reservationDate, setReservationDate] = useState(props.reservationDate);
    const [rentDate, setRentDate] = useState(props.rentDate);
    const [returnDate, setReturnDate] = useState(props.returnDate);
    const [condition, setCondition] = useState(props.condition);
    const [status, setStatus] = useState(props.status);
    const [book, setBook] = useState(props.book);
    const [coverPhoto, setCoverPhoto] = useState(props.coverPhoto);
    const [borrowerId, setBorrowerId] = useState(props.borrowerId);
    const [ownerId, setOwnerId] = useState(props.ownerId);

    const [convertedReturnDate, setConvertedReturnDate] = useState(new Date(props.returnDate))
    var currentDate = new Date();
    var sessionUserId = sessionStorage.getItem("sessionUserId")

    return (
        <>  
            <br></br>
            <div className="container-fluid d-flex flex-column align-items-center">
                <div className="row col-10 border bg-banana-blue bg-opacity-25 border-dark justify-content-between card">
                    <div className="card-body align-items-center row">
                        <div className="fw-normal fs-3 text-shadow-light mb-2">
                            Transaction Details:
                        </div>
                        <div className="fw-normal fs-5 text-shadow-light mb-2">
                            Username: {username}
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-2">
                            <Book variant="transactionDetails" author={author} cover_photo={coverPhoto} title={title} key={book}> </Book>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 fw-normal fs-5 text-shadow-light">
                            <div className="mb-2">
                                Title:
                            </div>
                            <div className="mb-2 col-12">
                                <TextField
                                    disabled
                                    id="title"
                                    fullWidth
                                    value={title}
                                />
                            </div>
                            <div className="mb-2">
                                Author:                             
                            </div>
                            <div className="mb-2 col-12">
                                <TextField
                                    disabled
                                    id="author"
                                    fullWidth
                                    value={author}
                                />
                            </div>
                            <div className="mb-2">
                                ISBN:                                 
                            </div>
                            <div className="mb-2 col-12">
                                <TextField
                                    disabled
                                    id="isbn"
                                    fullWidth
                                    value={isbn}
                                />
                            </div>                         
                            <div className="mb-2">
                                Book Condition:                               
                            </div>
                            <div className="mb-2 col-12">
                                <TextField
                                    disabled
                                    id="bookCondition"
                                    fullWidth
                                    value={condition}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 fw-normal fs-5 text-shadow-light">
                            <div className="mb-2">
                                Reservation Date:
                            </div>
                            <div className="mb-2 col-12 ">
                                <TextField
                                    disabled
                                    id="reservationDate"
                                    fullWidth
                                    value={reservationDate}
                                />
                            </div>
                            <div className="mb-2">
                                Rent Date:
                            </div>
                            <div className="mb-2 col-12 ">
                                <TextField
                                    disabled
                                    id="rentDate"
                                    fullWidth
                                    value={rentDate}
                                />
                            </div>
                            <div className="mb-2">
                                Return Date:
                            </div>
                            <div className="mb-2 col-12 ">
                                <TextField
                                    disabled
                                    id="returnDate"
                                    fullWidth
                                    value={returnDate}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <div className="mb-2">
                                        Status:
                                </div>
                                <div className="d-flex align-items-center justify-content-center bg-secondary text-black p-3 rounded">

                                    {status}
                                </div>
                            </div>
                        </div>

                        
                        {/* FIXME: remove d-none class from all divs, I added it only for development */}
{/* status = 1 (reservation) and user = book_owner =======================================================================================================================*/}
                        {status==="reservation" && sessionUserId == ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">

                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            reservation_date:null,
                                            rent_date:null,
                                            return_date:null,
                                            book_id:book,
                                            state:2,
                                            borrower_key:borrowerId,
                                            id:transactionId,
                                        })
                                    }}>Accept Reservation</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-outline-danger col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            reservation_date:null,
                                            rent_date:null,
                                            return_date:null,
                                            book_id:book,
                                            state:8,
                                            borrower_key:borrowerId,
                                            id:transactionId,
                                        })
                                    }}>Reject Reservation</button>
                                </div>
                            </div>
                        }
{/* =======================status = 3 (your_turn) user = borrower================================================================================================ */}
                        {status==="your_turn" && sessionUserId === borrowerId &&
                            <div className="col-12 mb-3 d-flex align-items-stretch mt-3 ">
                                <div className="row col-6 gy-3">
                                    <div className="col-4">
                                        From:
                                    </div>  
                                    <div className="col-6">
                                        <input type="date" id="" className="form-control"/>
                                    </div>
                                    <div className="col-4">
                                        To:
                                    </div>
                                    <div className="col-6">
                                        <input type="date" id="" className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-center align-items-stretch">
                                    <button className="btn btn-banana-primary col-6">Submite rent period</button>
                                </div>
                            </div>
                        }
{/* status = 4 (rent_period_confirmation???) and user = book_owner =======================================================================================================================*/}
                        {status==="dates_chosen" && sessionUserId === ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12">Confirm reservation period</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-outline-danger col-12">Reject reservation period</button>
                                </div>
                            </div>
                        }
{/* status = 5 (accepted_date)  and user = book_owner =======================================================================================================================*/}
                        {status==="accepted_date" && sessionUserId === ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12">Confirm book passing</button>
                                </div>
                            </div>  
                        }             
{/* status = 6 (passed_down)  and user = borrower =======================================================================================================================*/}
                        {status==="passed_down" && sessionUserId == borrowerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12">Confirm book receipt</button>
                                </div>
                            </div>   
                        } 
{/* status = 7 (lent)  and user = borrower =======================================================================================================================*/}
                        {status==="lent" && sessionUserId == borrowerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12">Book returned</button>
                                </div>
                            </div>   
                        }
{/* status = 7 (lent)  and user = book_owner and deadline overdue =======================================================================================================================*/}
                        {status==="lent" && currentDate > convertedReturnDate && sessionUserId == ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12">Book not returned</button>
                                </div>
                            </div>  
                        }
{/* status = 8 (returned)  and user = book_owner =======================================================================================================================*/}
                        {status==="returned" && sessionUserId == ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12">Confirm book receipt</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-outline-danger col-12">Book not delivered</button>
                                </div>
                            </div>   
                        }
{/* status = 9 (successfully_finished)  and user = book_owner or borrower =======================================================================================================================*/}
                        {status==="successfully_finished" && 
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12">Review</button>
                                </div>
                            </div> 
                        }
{/* status = 10 (unsuccessfully_finished)  and user = book_owner or borrower =======================================================================================================================*/}
                        {status==="unsuccessfully_finished" &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12">Review</button>
                                </div>
                            </div> 
                        }

                        <hr className="mt-5"/>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-banana-primary col-12 col-lg-6 col-xl-4 p-2" onClick={() => 
                                {
                                    props.updateShowDetailsFromChildren(false) 
                                    if(window.location.pathname.split('/').length === 3)
                                    {
                                        //window.location.replace("/Transactions");
                                        history.pushState({}, null, "/Transactions");
                                    }
                                }}>Hide Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionDetails;
