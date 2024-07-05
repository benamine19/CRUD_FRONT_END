import React, { useEffect } from 'react'
import Affichage from '../components/Affichage'
import Navbare from '../components/Navbare'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


function Princ() {
const dispatch = useDispatch();
const { user } = useSelector((state) => state.user);
const navigate = useNavigate()


  return (
    <div>
    <Affichage/>
    </div>
  )
}

export default Princ