import {useState, useEffect} from 'react';
import Error from "./Error"


const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false)
  
  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha) //Date.now()
      setSintomas(paciente.sintomas)  
    }
  }, [paciente])



  // Experimental Autofill
  const Autofill = () => {
    setNombre("Francesco")
    setPropietario("JMA")
    setEmail("JMA@correo.com")
    setFecha(Date()) //Date.now()
    setSintomas("Ejemplo")  
  }
  

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  const handleSubmit =(e) =>{
    e.preventDefault();

    //Validación formulario
    if([nombre, propietario, email, fecha, sintomas].includes("")){
      console.log("Hay al menos un campo vacío")
      setError(true)
      return;
    }

    setError(false)
    
    // Construimos el objeto de Paciente

    const objetoPaciente ={
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,

    }

    if(paciente.id){
      // Editando registro
      objetoPaciente.id = paciente.id
      const pacientesAcutalizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesAcutalizados)
      setPaciente({})

    } else{
      // Nuevo Registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])

    }
    

    //Reiniciar el form
    setNombre("")
    setPropietario("")
    setEmail("")
    setFecha("")
    setSintomas("")


   
  }


  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>Seguimiento Datos</h2>

        <p className='text-lg mt-5 text-center mb-10'>
          Añade Fichas y {""}
          <span className=' text-indigo-600 font-bold'>Administralas</span>
        </p>

        <form 
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
          
          {error &&  <Error>Todos los campos son obligatorios</Error>}

          <div className='mb-5'>
            <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>
              Nombre
            </label>

            <input 
              id="mascota" 
              type="text" 
              placeholder='Nombre' 
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>



          <div className='mb-5'>
            <label htmlFor="Propietario" className='block text-gray-700 uppercase font-bold'>
              Nombre Responsable
            </label>

            <input 
              id="Propietario" 
              type="text" 
              placeholder='Denominación Contacto' 
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
            />
          </div>



          <div className='mb-5'>
            <label htmlFor="Email" className='block text-gray-700 uppercase font-bold'>
              Email
            </label>

            <input 
              id="email" 
              type="email" 
              placeholder='Email contacto' 
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className='mb-5'>
            <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>
              Alta
            </label>

            <input 
              id="alta" 
              type="date" 
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>


          <div className='mb-5'>
            <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>
              Descripción
            </label>
            <textarea
            id= "sintomas"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Descripción'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            />

          </div>

          <input
            type="submit"
            className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
            value={paciente.id ? "Guardar Cambios" : "Agregar Ficha"}
          />
          
          <button 
            onClick={Autofill} 
            className='bg-orange-600 w-full p-3 text-white uppercase font-bold hover:bg-orange-700 cursor-pointer transition-all mt-3' 
            >
             Autofill 
          </button>
          


          
        </form>
    </div>
  )
}

export default Formulario