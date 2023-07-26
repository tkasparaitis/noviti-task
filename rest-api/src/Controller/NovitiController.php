<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class NovitiController extends AbstractController
{
    #[Route('/noviti', name: 'app_noviti')]
    public function index(Request $request): JsonResponse
    {
        $yearlyInterest = 12.7;
        $termMonths = 6;
        $totalAmount = $request->query->get('totalAmount');

        $monthlyInterestRate = ($yearlyInterest / 100) / 12;
        $annuityPayment = round($totalAmount * ($monthlyInterestRate * pow(1 + $monthlyInterestRate, $termMonths))
                      / (pow(1 + $monthlyInterestRate, $termMonths) - 1), 2);
        
        $remainingCredit = $totalAmount;
        $totalPayment = 0;

        $loanSchedule = array();

        for ($month = 1; $month <= $termMonths; $month++) {
            $interest = round($remainingCredit * $monthlyInterestRate, 2);
            $principalPart = round($annuityPayment - $interest, 2);
            $remainingCredit = round($remainingCredit - $principalPart, 2);
            $totalPayment = round($totalPayment + $annuityPayment, 2);
            
            $paymentObj = (object) array(
                'remaining' => $remainingCredit,
                'principal' => $principalPart,
                'interest' => $interest,
                'total' => $annuityPayment
            );
        
            $loanSchedule[] = $paymentObj;
        }

        $response = $this->json([
            'schedule' => $loanSchedule
        ]);

        $response->headers->set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
        $response->headers->set('Access-Control-Allow-Methods', 'GET');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type');

        return $response;
    }
}
