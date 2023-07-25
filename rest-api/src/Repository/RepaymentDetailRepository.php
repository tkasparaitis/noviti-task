<?php

namespace App\Repository;

use App\Entity\RepaymentDetail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<RepaymentDetail>
 *
 * @method RepaymentDetail|null find($id, $lockMode = null, $lockVersion = null)
 * @method RepaymentDetail|null findOneBy(array $criteria, array $orderBy = null)
 * @method RepaymentDetail[]    findAll()
 * @method RepaymentDetail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RepaymentDetailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RepaymentDetail::class);
    }

//    /**
//     * @return RepaymentDetail[] Returns an array of RepaymentDetail objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?RepaymentDetail
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
