import Mew from '../assets/pokemon-sprites/Pokemon/mew.gif';

const About = () => {
  return (
    <div name='main' className="w-full h-screen text-white">
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <div className="flex items-center mx-auto p-4">
          <h1 className="text-4xl">About</h1>
          <img src={Mew} alt="Mew from Pokémon" className="w-1/4 md:w-1/6 ml-4" />
        </div>
      </div>
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <p className="flex items-center mx-auto text-sm">
          Images and music from Pokémon &copy; The Pokémon Company, Nintendo
        </p>
      </div>
      <div className="mx-auto p-4">
        <div className="project-box">
          <p className="text-lg">
          Welcome to the PokéStore Management System Web Application! This comprehensive CRUD (CREATE, READ, UPDATE, DELETE) 
          project has been designed to facilitate efficient order and product management for the PokéMart store within the game. 
          The development of this project utilizes a powerful combination of mySQL, Flask, and React technologies. The application 
          boasts an engaging user interface, ensuring an interactive, responsive, and enjoyable experience. Moreover, be sure to keep an eye out for hidden interactive easter eggs 
          strategically placed throughout for added enjoyment! 
          </p>
          <p>Interface:</p>
          <ul>
            <li>Welcome Page: Click on the PSMS on the NavBar</li>
            <li>Customer Order: Click on the Home on the NavBar</li>
            <li>Customer Order Detail: Click on the name of the customer</li>
            <li>Show Products: Click on Products</li>
            <li>Manage Products: Click on Manage Products</li>
            <li>New Order: Click on New Order</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
