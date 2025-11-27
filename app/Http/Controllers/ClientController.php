<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Repositories\ClientRepositories;

class ClientController extends Controller
{
    public function __construct(protected ClientRepositories $clientRepositories)
    {}
    public function index()
    {
        $data = $this->clientRepositories->index(['projectsByClient'],['role'=>'client']);
        // return view('client',compact('data'));
        // dd($data);
        return Inertia::render('Clients/getClients', compact('data'));
    }

    public function store(StoreUserRequest $request) 
    {
        $data = $request->validated();
        $data['role']='client';
        DB::beginTransaction();
        try{
            $this->clientRepositories->store($data);
            DB::commit();
            return redirect()->route('clients.index')->with('success', 'Clients created successfully!');
        }
        catch(\Exception $e){
            DB::rollBack();
            return redirect()->route('clients.index');
        }
    }

    public function update(UpdateUserRequest $request, string $id)
    {
        DB::beginTransaction(); 
        try
        {
            $data=$request->validated();
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
