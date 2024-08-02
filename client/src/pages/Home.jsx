/* eslint-disable react/prop-types */
function HomePage({user}) {
  return (
    <>
      <h1>Домашняя страница
        
      </h1>
      <h2>Здравствуй, {user ? user.name : "Незнакомец"}</h2>
    </>
  );
}

export default HomePage;