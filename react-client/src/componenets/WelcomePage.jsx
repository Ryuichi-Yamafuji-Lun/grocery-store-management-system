import pikachu from '../assets/pokemon-sprites/Pokemon/pikachu.gif'

const WelcomePage = () => {

  return (
    <div className="w-full h-screen"> 
      <div className="max-w-[1000px] mx-auto px-8 flex items-center flex-col justify-center h-full">
        <h1 className="text-4xl sm:text-7xl font-bold"> Welcome </h1>
        <p className="text-2xl py-4 max-w-[700px]">PokéStore Management System</p>
        <p className="max-w-[700px]"> Made with React, mySQL, and Flask</p>
        <img src={pikachu} alt="Pikachu"/>
      </div>
    </div>
  )
}

export default WelcomePage