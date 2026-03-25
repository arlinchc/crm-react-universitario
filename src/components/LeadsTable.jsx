import Badge  from './Badge';

function LeadsTable({ leads }) {
   return(
     <div className='overflow-x-auto rounded-xl shadow bg-white'>
        <table className="min-w-full">
            <thead className="bg-slate-100 text-slate-600">
                <tr>
                    <th className='p-4 text-left'>Nombre</th>
                    <th className='p-4 text-left'>Correo</th>
                    <th className='p-4 text-left'>Estatus</th>
                </tr>
            </thead>
            <tbody>
                {leads.map(lead =>(
                <tr
                    key={lead.id}
                    className="border-t hover:bg-slate-50 transition"
                >
                    <td className='p-4'>{lead.name}</td>
                    <td className='p-4'>{lead.email}</td>
                    <td className='p-4'>
                        <Badge text={lead.status} />
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
     </div>
   )
}

export  default LeadsTable