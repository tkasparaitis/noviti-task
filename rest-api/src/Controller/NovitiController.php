<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class NovitiController extends AbstractController
{
    #[Route('/noviti', name: 'app_noviti')]
    public function index(): JsonResponse
    {
        $response = $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/NovitiController.php',
        ]);

        $response->headers->set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type');

        return $response;
    }
}
