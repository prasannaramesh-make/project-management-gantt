'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function DashboardPage(){

  const [projects,setProjects] = useState<any[]>([])
  const [showPopup,setShowPopup] = useState(false)

  const [name,setName] = useState('')
  const [startDate,setStartDate] = useState('')
  const [endDate,setEndDate] = useState('')

  // LOAD PROJECTS
  const loadProjects = async ()=>{
    const { data } = await supabase.from('projects').select('*')
    if(data) setProjects(data)
  }

  useEffect(()=>{
    loadProjects()
  },[])

  // ADD PROJECT
  const addProject = async ()=>{

    const { data:{ user } } = await supabase.auth.getUser()

    await supabase.from('projects').insert({
      project_name:name,
      start_date:startDate,
      end_date:endDate,
      user_id:user?.id
    })

    setShowPopup(false)
    setName('')
    setStartDate('')
    setEndDate('')

    loadProjects()
  }

  return(
    <div style={{padding:40}}>

      <div style={{display:'flex',justifyContent:'space-between'}}>
        <h2>Your Projects</h2>

        <button onClick={()=>setShowPopup(true)}
          style={{background:'#2575fc',color:'#fff',padding:10,border:'none',borderRadius:6}}>
          Add Project
        </button>
      </div>

      <div style={{marginTop:20}}>

        {projects.map((p)=>(
          <div key={p.id} style={{
            padding:15,
            border:'1px solid #ddd',
            borderRadius:8,
            marginBottom:10,
            display:'flex',
            justifyContent:'space-between'
          }}>
            <div>
              <b>{p.project_name}</b><br/>
              {p.start_date} - {p.end_date}
            </div>

            <button style={{background:'#6a11cb',color:'#fff',padding:8,border:'none',borderRadius:6}}>
              View
            </button>
          </div>
        ))}

      </div>

      {showPopup && (
        <div style={{
          position:'fixed',
          top:0,left:0,right:0,bottom:0,
          background:'rgba(0,0,0,0.4)',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <div style={{background:'#fff',padding:30,borderRadius:10,width:300}}>

            <h3>Create Project</h3>

            <input placeholder="Project Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:10}}
            />

            <input type="date"
              value={startDate}
              onChange={(e)=>setStartDate(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:10}}
            />

            <input type="date"
              value={endDate}
              onChange={(e)=>setEndDate(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:15}}
            />

            <button onClick={addProject}
              style={{width:'100%',background:'#2575fc',color:'#fff',padding:10,border:'none',borderRadius:6}}>
              Create
            </button>

          </div>
        </div>
      )}

    </div>
  )
}