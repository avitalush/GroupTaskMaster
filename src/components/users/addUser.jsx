import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { API_URL, TOKEN_NAME, doApiMethodSignUpLogin, doApiTokenGet } from '../../store/services/service';
import { currentUser } from '../../store/features/userSlice';
import swal from 'sweetalert';
import "../../css/login.css";
import { currentBuilding } from '../../store/features/buildingSlice';


const AddUser = () => {


  
  

    return (
        <div className='container center p-5'>
         
     
        </div>
    )
}

export default AddUser;