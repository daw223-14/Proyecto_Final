
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `contacto` (
  `contactoID` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `mensaje` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `contacto` (`contactoID`, `nombre`, `correo`, `mensaje`) VALUES
(1, 'Patricia', 'patricia@gmail.com', 'Hola'),
(2, 'Austin', 'austin@gmail.com', 'Hi there'),
(3, 'Paco', 'paco@test.com', 'testing');

CREATE TABLE `pedidos` (
  `pedidoID` int(11) NOT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `pedidocol` varchar(100) DEFAULT NULL,
  `fechaPedido` datetime DEFAULT current_timestamp(),
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pedidos` (`pedidoID`, `correo`, `telefono`, `direccion`, `pedidocol`, `fechaPedido`, `nombre`) VALUES
(1, 'patricia@gmail.com', '60309423', 'Calle ejemplo 4', NULL, '2023-08-10 01:53:23', 'patr'),
(2, 'ejemplo@gmail.com', '63823941', 'avd lorem 2', NULL, '2023-08-10 14:32:30', 'ejem'),
(3, 'juan@gmail.com', '40385829', 'plaza verde', NULL, '2023-08-10 14:41:00', 'austin');

CREATE TABLE `productos_pedidos` (
  `productos_pedidosID` int(11) NOT NULL,
  `pedidoID` int(11) NOT NULL,
  `productoID` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `productos_pedidos` (`productos_pedidosID`, `pedidoID`, `productoID`, `cantidad`) VALUES
(1, 2, 1, 1),
(2, 3, 1, 2),
(3, 3, 8, 1);

CREATE TABLE `productos` (
  `productoID` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `genero` varchar(45) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `marca` varchar(50) NOT NULL,
  `precio` decimal(5,2) DEFAULT NULL,
  `cantidadVendido` int(11) DEFAULT NULL,
  `fechaAñadido` timestamp NOT NULL DEFAULT current_timestamp(),
  `rutaimg` varchar(150) DEFAULT NULL,
  `rutaimghover` varchar(160) DEFAULT NULL,
  `precio_anterior` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `productos` (`productoID`, `nombre`, `genero`, `descripcion`, `marca`, `precio`, `cantidadVendido`, `fechaAñadido`, `rutaimg`, `rutaimghover`, `precio_anterior`) VALUES
(1, 'Nike LD Waffle Sacai Black Nylon', 'hombre', 'Nike LD Waffle Sacai Black Nylon', 'Nike', '401.00', 3, '2023-05-25 00:42:26', 'dist/images/img01.jpg', NULL, NULL),
(2, 'Nike Dunk Low Off-White Pine Green', 'hombre', 'Nike Dunk Low Off-White Pine Green', 'Nike', '49.99', 10, '2023-05-25 00:54:09', 'dist/images/img02.jpg', NULL, 55),
(3, 'Nike Air Force 1 Low Supreme Black', 'hombre', 'Nike Air Force 1 Low Supreme Black', 'Nike', '59.99', 3, '2023-05-25 00:54:09', 'dist/images/img03.jpg', NULL, NULL),
(4, 'Nike LD Waffle Sacai White Nylon', 'hombre', 'Nike LD Waffle Sacai White Nylon', 'Nike', '79.99', 0, '2023-05-25 00:54:09', 'dist/images/img04.jpg', NULL, NULL),
(5, 'NikNike Dunk Low SP Kentucky (2021)e', 'mujer', 'Nike Dunk Low SP Kentucky (2021)', 'Nike', '39.99', 0, '2023-05-25 00:54:09', 'dist/images/img05.jpg', NULL, NULL),
(6, 'Nike Dunk Low Off-White University', 'mujer', 'Nike Dunk Low Off-White University', 'Nike', '19.99', 0, '2023-05-25 00:54:09', 'dist/images/img06.jpg', NULL, 0),
(7, 'Nike Air Max 2 Light Atmos', 'mujer', 'Nike Air Max 2 Light Atmos', 'Nike', '34.99', 0, '2023-05-25 00:54:09', 'dist/images/img07.jpg', NULL, NULL),
(8, 'Nike Air Force 1 Low CLOT Blue Silk', 'mujer', 'Nike Air Force 1 Low CLOT Blue Silk', 'Nike', '24.99', 5, '2023-05-25 00:54:09', 'dist/images/img08.jpg', NULL, 56),
(9, 'Nike Air Max 90 OG Volt (2020)', 'niños', 'Nike Air Max 90 OG Volt (2020)', 'Nike', '89.99', 1, '2023-05-25 00:54:09', 'dist/images/img09.jpg', NULL, NULL),
(10, 'Nike Dunk High Varsity Maize', 'niños', 'Nike Dunk High Varsity Maize', 'Nike', '59.99', 8, '2023-05-25 00:54:09', 'dist/images/img10.jpg', NULL, 88),
(11, 'Nike Air Rubber Dunk Off-White UNC', 'niños', 'Nike Air Rubber Dunk Off-White UNC', 'Nike', '29.99', 0, '2023-05-25 00:54:09', 'dist/images/img11.jpg', NULL, NULL);

CREATE TABLE `subscripciones` (
  `subscripcionID` int(11) NOT NULL,
  `correos` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `subscripciones` (`subscripcionID`, `correos`) VALUES
(156, 'altinduraku02@gmail.com'),
(158, 'altinduraku2@gmail.com');

CREATE TABLE `usuarios` (
  `usuarioID` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `contraseña` varchar(128) NOT NULL,
  `direccion` varchar(128) DEFAULT NULL,
  `telefono` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `usuarios` (`usuarioID`, `nombre`, `correo`, `username`, `contraseña`, `direccion`, `telefono`) VALUES
(30, 'Admin', 'admin@gmail.com', 'admin', 'root.', 'lorem', '044111000'),
(32, 'Jimmy', 'jimmy@gmail.com', 'jimmy', 'admin', 'lorem', '23121445566');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`contactoID`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedidoID`),
  ADD UNIQUE KEY `orderId_UNIQUE` (`pedidoID`);

--
-- Indexes for table `productos_pedidos`
--
ALTER TABLE `productos_pedidos`
  ADD PRIMARY KEY (`productos_pedidosID`),
  ADD KEY `FK_order_items_orders` (`pedidoID`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`productoID`),
  ADD UNIQUE KEY `idproducts_UNIQUE` (`productoID`);

--
-- Indexes for table `subscripciones`
--
ALTER TABLE `subscripciones`
  ADD PRIMARY KEY (`subscripcionID`),
  ADD UNIQUE KEY `idsubscriptions_UNIQUE` (`subscripcionID`),
  ADD UNIQUE KEY `emails_UNIQUE` (`correos`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioID`),
  ADD UNIQUE KEY `email_UNIQUE` (`correo`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD UNIQUE KEY `phonenumber_UNIQUE` (`telefono`),
  ADD UNIQUE KEY `iduser_UNIQUE` (`usuarioID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacto`
--
ALTER TABLE `contacto`
  MODIFY `contactoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pedidoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `productos_pedidos`
--
ALTER TABLE `productos_pedidos`
  MODIFY `productos_pedidosID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `subscripciones`
--
ALTER TABLE `subscripciones`
  MODIFY `subscripcionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=188;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `productos_pedidos`
--
ALTER TABLE `productos_pedidos`
  ADD CONSTRAINT `FK_order_items_orders` FOREIGN KEY (`pedidoID`) REFERENCES `pedidos` (`pedidoID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
