<?php
/**
 * Created by PhpStorm.
 * User: htpc
 * Date: 2018/8/25
 * Time: 14:26
 */

namespace server\console;


use Noodlehaus\Config;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CreateMysqlCmd extends Command {
	public function __construct( ?string $name = null ) {
		parent::__construct( $name );
	}

	public function configure() {
		$this->setName('mysql');
		$this->addArgument('mysqlName', InputArgument::REQUIRED , 'Who do you want serverName?');
	}

	public function execute( InputInterface $input, OutputInterface $output ) {
		$extension = checkExtension();
		$oi = new SymfonyStyle($input,$output);
		if($extension !== true){
			$oi->error($extension);
			return false;
		}
		$server = $input->getArgument('mysqlName');
		switch ($server)
		{
			case 'factory':
				print_r("factory\n");
				\server\Generator\MysqlFactoryBuilder::buildingFactoryClass( 'test', '', '' );
				break;
			case 'entity':
				\server\Generator\MysqlEntityBuilder::buildingEntityClass( 'test', '', '', '', '' );
				print_r("entity\n");
				break;
			default:
				$oi->error('服务错误');
		}
	}
}