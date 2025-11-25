
function App() {

  window?.Telegram?.WebApp?.ready();

  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  // const theme = window.Telegram?.WebApp?.themeParams;

  return (
   <div className=' w-full p-5'>
    <h1>Head text</h1>

    <h4>Heloo {user?.first_name} {user?.last_name} {user?.username}</h4>
   </div>
  )
}

export default App
