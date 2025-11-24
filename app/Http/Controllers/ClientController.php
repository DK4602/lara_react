<?php

namespace App\Http\Controllers;

use App\Repositories\ClientRepositories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function __construct(protected ClientRepositories $clientRepositories)
    {}
    public function index()
    {
        $data = $this->clientRepositories->index(['projectsByClient'],['role'=>'client']);
        return view('client',compact('data'));
    }

    public function update(Request $request, string $id)
    {
        DB::beginTransaction(); 
        try
        {
            $data=$request->validate([
            'name'=>'required',
            'email'=>'required'
            ]);
            $this->clientRepositories->update($data ,$id);
            DB::commit();
            return redirect()->route('clients.index')->with('success', 'Client updated successfully!');
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return redirect()->route('clients.index');
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try{
            $this->clientRepositories->destroy($id);
            DB::commit();
            return redirect()->route('clients.index')->with('success', 'Client deleted successfully!');
        }
        catch(\Exception $e){
            DB::rollBack();
            return redirect()->route('clients.index');
        }
    }

    
}
