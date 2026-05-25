<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function batchStore(Request $request): JsonResponse
    {
        $data = $request->json()->all();

        if (!isset($data['tasks']) || !is_array($data['tasks'])) {
            return response()->json(['error' => 'Formato de dados incorreto.'], 400);
        }

        $createdTasks = [];

        foreach ($data['tasks'] as $taskData) {
            if (!empty(trim($taskData['content']))) {
                $createdTasks[] = Task::create([
                    'user_id' => 1,
                    'content' => $taskData['content'],
                    'status' => 'captured',
                ]);
            }
        }

        return response()->json([
            'message' => 'Tarefa capturada com sucesso.',
            'data' => $createdTasks
        ], 201);
    }

    public function pending(): JsonResponse
    {
        $tasks = Task::where('user_id', 1)->where('status','capturated')->get();
        return response()->json($tasks);
    }

    public function process(Request $request,$id): JsonResponse
    {
        $request->validate([
            'estimated_minutes' => 'required|integer|min:1'
        ]);

        $task = Task::where('user_id',1)->findOrFail($id);

        $task->update([
            'estimated_minutes' => $request->input('estimated_minutes'),
            'status' => 'processed'
        ]);

        return response()->json([]);
    }

}
