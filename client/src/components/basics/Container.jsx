import MainContainer from './MainContainer'

const Container = ({ children }) => {
    return (
        <MainContainer>
            <main className='container my-4'>
                {children}
            </main>
        </MainContainer>
    )
}

export default Container