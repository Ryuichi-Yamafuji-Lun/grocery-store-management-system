
const About = () => {
  return (
    <div name='main' className="w-full h-screen">
      <div className="mx-auto flex flex-row justify-between items-center p-4">
        <div className="flex items-center mx-auto p-4">
          <h1 className="text-4xl">About</h1>
        </div>
      </div>

      <div className="mx-auto p-4">
        <div className="project-box">
          <p className="text-lg">
          Welcome to the Grocerystore Management System Web Application! This comprehensive CRUD (CREATE, READ, UPDATE, DELETE) 
          project has been designed to facilitate efficient order and product management. 
          The development of this project utilizes a powerful combination of mySQL, Flask, and React technologies. The application 
          boasts an engaging user interface, ensuring an interactive, responsive, and enjoyable experience. Moreover, be sure to keep an eye out for hidden interactive easter eggs 
          strategically placed throughout for added enjoyment! 
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
