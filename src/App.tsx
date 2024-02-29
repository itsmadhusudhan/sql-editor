function App() {
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="grid grid-cols-[16rem_1fr] flex-1 max-h-[calc(100%-300px)]">
        <div className="w-64 min-w-16 border-r overflow-y-auto h-full">
          sidebar
        </div>
        <div className="h-full overflow-hidden">
          <header className="h-12 border-b">header</header>
          <div className="overflow-y-auto h-[calc(100%-48px)]">Editor</div>
        </div>
      </div>
      <div className="border-t h-[300px] overflow-auto bg-white">Results</div>
    </div>
  );
}

export default App;
