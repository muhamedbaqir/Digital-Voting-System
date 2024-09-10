from cassandra.cluster import Cluster
import os

cluster = Cluster([os.getenv('CASSANDRA_HOST', 'localhost')])
session = cluster.connect('elections')
