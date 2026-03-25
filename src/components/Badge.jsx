const color= {
    Prospecto: 'bg-blue-100 text-blue-800',
    Contactado: 'bg-yellow-100 text-yellow-800',
    Confirmado: 'bg-purple-100 text-purple-800',
    Inscrito: 'bg-green-100 text-green-800',
}

function Badge({ text}) {
    return(
    <span className=
        {`px-3 py-1 rounded-full text-sm font-medium ${
            color[text] || 'bg-gray-100 text-gray-800'
            }
        `}>
            {text}
    </span>
    )
}
export default Badge